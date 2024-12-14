import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

    const initialAction = () => {
        const message = createChatBotMessage('Just type in your name to begin.');
        updateState(message, "age")
    }

    const afterNameMessage = () => {
        const message = createChatBotMessage("Let me know your age so I can suggest the best treatment for you.")
        updateState(message, "preference")
    }

    const afterAgeMessage = () => {
        const message = createChatBotMessage("Are the symptoms increasing gradualy or fast", {
            widget: "startSlow"
        })
        updateState(message)
    }

    const finalResult = (name, age, preference, mediciene) => {
        const message = createChatBotMessage(`Got it, ${name}! Based on your age ${age} and preference for ${preference} symptoms, Possible disease is '${mediciene}.' Get well soon!`, {
            widget: "finalImage"
        })
        updateState(message)
    }

    const updateState = (message, checker) => {
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
            checker,
        }))
    }

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        initialAction,
                        afterNameMessage,
                        afterAgeMessage,
                        finalResult
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;