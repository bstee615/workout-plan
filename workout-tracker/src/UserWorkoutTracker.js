import React, { useState, useEffect } from 'react';
import * as SignalR from '@microsoft/signalr';

const UserWorkoutTracker = ({ username, color }) => {
    const [sets, setSets] = useState([false, false, false]);
    const [hubConnection, setHubConnection] = useState(null);

    useEffect(() => {
        const createHubConnection = async () => {
            const hubConnect = new SignalR.HubConnectionBuilder()
                .withUrl('http://localhost:5190/workout') // replace with your server URL
                .withAutomaticReconnect()
                .build();

            try {
                await hubConnect.start();
                console.log('Connection successful!');
            } catch (err) {
                alert(err);
            }

            hubConnect.on('ReceiveSetUpdate', (user, sets) => {
                console.log('ReceiveSetUpdate', user, sets);
                if (user === username) {
                    setSets(sets);
                }
            });

            setHubConnection(hubConnect);
        }

        createHubConnection();

        return () => {
            hubConnection?.stop();
        }
    }, []);

    useEffect(() => {
        if (hubConnection) {
            hubConnection.invoke('GetCurrentWorkoutState', username)
                .then(currentState => {
                    if (currentState) {
                        setSets(currentState.sets);
                    }
                })
                .catch(err => console.error(err));

            hubConnection.on('ReceiveSetUpdate', (user, sets) => {
                if (user === username) {
                    setSets(sets);
                }
            });

            return () => {
                hubConnection.off('ReceiveSetUpdate');
            };
        }
    }, [hubConnection]);

    const addSet = () => {
        const newSets = [...sets, false];
        setSets(newSets);
        hubConnection?.invoke('SendSetUpdate', username, newSets);
    };

    const removeSet = () => {
        const newSets = sets.slice(0, sets.length - 1);
        setSets(newSets);
        hubConnection?.invoke('SendSetUpdate', username, newSets);
    };

    const completeSet = () => {
        const newSets = sets.map((set, index) => index === sets.findIndex(s => !s) ? true : set);
        setSets(newSets);
        hubConnection?.invoke('SendSetUpdate', username, newSets);
    };

    const uncompleteSet = () => {
        const newSets = sets.map((set, index) => index === sets.findLastIndex(s => s) ? false : set);
        setSets(newSets);
        hubConnection?.invoke('SendSetUpdate', username, newSets);
    };

    const reset = () => {
        const newSets = sets.map(() => false);
        setSets(newSets);
        hubConnection?.invoke('SendSetUpdate', username, newSets);
    };

    return (
        <div style={{
            backgroundColor: color, flex: 1, width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <h2>{username}'s Workout</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <button onClick={removeSet}>➖</button>
                {sets.map((set, index) => (
                    <div
                        key={index}
                        style={{ height: '10px', width: '10px', borderRadius: '50%', background: set ? '#fff' : 'transparent', border: '1px solid #fff' }}
                        onClick={() => uncompleteSet(index)}
                    />
                ))}
                <button onClick={addSet}>➕</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <button onClick={reset} disabled={sets.every(set => !set)}>Reset</button>
                <button onClick={completeSet}>Complete Set</button>
            </div>
        </div>
    );
};

export default UserWorkoutTracker;
