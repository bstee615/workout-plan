using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

public class WorkoutHub : Hub
{
    public async Task SendSetUpdate(string username, List<bool> sets)
    {
        var userState = CurrentWorkoutStates.FirstOrDefault(state => state.Username == username);

        if (userState == null)
        {
            userState = new WorkoutState { Username = username, Sets = sets };
            CurrentWorkoutStates.Add(userState);
        }
        else
        {
            userState.Sets = sets;
        }


        // Broadcast the set update to all connected clients
        await Clients.All.SendAsync("ReceiveSetUpdate", username, sets);
    }

    public class WorkoutState
    {
        public string Username { get; set; }
        public List<bool> Sets { get; set; }
    }

    private static List<WorkoutState> CurrentWorkoutStates = new List<WorkoutState>();

    public WorkoutState GetCurrentWorkoutState(string username)
    {
        return CurrentWorkoutStates.FirstOrDefault(state => state.Username == username);
    }
}
