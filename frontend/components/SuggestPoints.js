import React from 'react';
import { Button, Modal, Center, Text, VStack, Radio, HStack } from 'native-base';
import { useState, useEffect } from 'react';
import FormHeader from './util/FormHeader';
import { useNavigate, useLocation } from 'react-router-native';
import FormHeaderLink from './util/FormHeaderLink';
const data = {
    pickData: [
        {
            id: 0,
            text: 'Czerwony - ',
            next: [2, 3],
        },
        {
            id: 1,
            text: 'Niebieski - ',
            next: [2, 3],
        },
        {
            id: 2,
            text: 'Natarcie - ',
            next: [4, 5],
        },
        {
            id: 3,
            text: 'Odpowiedź - ',
            next: [9, 10, 11],
        },
        {
            id: 4,
            text: 'nieskuteczne. ',
            next: [0, 1],
        },
        {
            id: 5,
            text: 'Trafienie',
            next: [6, 7, 8],
        },
        {
            id: 6,
            text: ' w kończynę. ',
            next: [0, 1],
        },
        {
            id: 7,
            text: ' w głowę. ',
            next: [0, 1],
        },
        {
            id: 8,
            text: ' w tułów. ',
            next: [0, 1],
        },
        {
            id: 9,
            text: ' spóźniona. ',
            next: [0, 1],
        },
        {
            id: 10,
            text: ' nieskuteczna. ',
            next: [0, 1],
        },
        {
            id: 11,
            text: ' w tempo - ',
            next: [6, 7, 8],
        },
    ],
    scoreOptions: [0, 1, 2],
};

function rewind(indexHistory, setIndexHistory, setCurrentStrings, setCurrentOptions) {
    if (indexHistory.length > 1) {
        setIndexHistory(indexHistory =>
            indexHistory.filter((_, i) => i !== indexHistory.length - 1)
        );
        setCurrentStrings(currentStrings =>
            currentStrings.filter((_, i) => i !== currentStrings.length - 1)
        );
        setCurrentOptions(indexHistory[indexHistory.length - 2].map(idx => data.pickData[idx]));
    }
}

function goNext(setCurrentStrings, setCurrentOptions, setIndexHistory, text, indexes) {
    setCurrentStrings(currentStrings => {
        return [...currentStrings, text];
    });
    setIndexHistory(currentIndexes => {
        return [...currentIndexes, indexes];
    });
    setCurrentOptions(indexes.map(idx => data.pickData[idx]));
}

function goStart(setCurrentStrings, setCurrentOptions, setIndexHistory, indexHistory) {
    if (!indexHistory[indexHistory.length - 1].every((val, index) => val === [0, 1][index])) {
        setCurrentStrings(currentStrings => {
            return [...currentStrings, ''];
        });
        setIndexHistory(currentIndexes => {
            return [...currentIndexes, [0, 1]];
        });
        setCurrentOptions([0, 1].map(idx => data.pickData[idx]));
    }
}

function reset(setCurrentStrings, setCurrentOptions, setIndexHistory) {
    setCurrentStrings([]);
    setIndexHistory([0, 1]);
    setCurrentOptions([data.pickData[0], data.pickData[1]]);
}

export const SuggestPoints = () => {
    const locationData = useLocation();
    const navigate = useNavigate();
    const props = locationData.state.state;
    console.log(props);
    console.log(props.state);
    const [showModal, setShowModal] = useState(false);
    const [currentStrings, setCurrentStrings] = useState([]);
    const [indexHistory, setIndexHistory] = useState([[0, 1]]);
    const [currentOptions, setCurrentOptions] = useState([data.pickData[0], data.pickData[1]]);
    const [chosenPointPick, setChosenPointPick] = useState(data.scoreOptions[0] ?? 0);
    const mainPromptColor =
        props.fighter === 1 ? 'red.400' : props.fighter === 2 ? 'blue.400' : 'gray.400';

    useEffect(() => {
        //TODO: Grab rule data from backend (current const data), alternatively - pass it in props from displayMatch if it gets it froim backend
    }, []);

    return (
        <>
            <FormHeaderLink
                name="Event chain"
                pathname="displayMatch"
                state={{
                    matchData: props.matchData,
                    fighter1: props.fighter1,
                    fighter2: props.fighter2,
                    userType: props.userType,
                }}
            />
            <Center bg={mainPromptColor} width="100%" p="5" border>
                <Text color="white">
                    Event chain {props.fighter != 0 && 'potentially giving points to'}
                </Text>
                <Text color="white">{props.fighter != 0 && props.fighterName}</Text>
            </Center>

            {/* change the color */}
            <Center width="auto" bg="gray.400" m={1}>
                <Text color="white">Suggested Event:</Text>
                <Text color="white">{currentStrings}</Text>
            </Center>

            {/*<Text>{indexHistory.map(el => "[" + el + "]")}</Text>*/}

            <VStack space={1} m={1}>
                <Center>
                    <Text>Choose next block:</Text>
                </Center>
                <Center>
                    {currentOptions.map(option => (
                        <Button
                            bg="#059669"
                            width="70%"
                            key={option.id}
                            m={1}
                            onPress={() => {
                                goNext(
                                    setCurrentStrings,
                                    setCurrentOptions,
                                    setIndexHistory,
                                    option.text,
                                    option.next
                                );
                            }}
                        >
                            {/*<Text>{option.id} {option.text}</Text>*/}
                            <Text color="white">{option.text}</Text>
                        </Button>
                    ))}
                </Center>
            </VStack>

            {/*<Text>{indexHistory.length}</Text>*/}

            <Center mb={3}>
                <HStack space={1}>
                    <Button
                        bg="#059669"
                        onPress={() => {
                            reset(setCurrentStrings, setCurrentOptions, setIndexHistory);
                        }}
                    >
                        <Text color="white">Reset</Text>
                    </Button>
                    <Button
                        bg="#059669"
                        onPress={() => {
                            goStart(
                                setCurrentStrings,
                                setCurrentOptions,
                                setIndexHistory,
                                indexHistory,
                                indexHistory
                            );
                        }}
                    >
                        <Text color="white">Go Start</Text>
                    </Button>
                    <Button
                        bg="#059669"
                        onPress={() => {
                            rewind(
                                indexHistory,
                                setIndexHistory,
                                setCurrentStrings,
                                setCurrentOptions
                            );
                        }}
                    >
                        <Text color="white">Rewind</Text>
                    </Button>
                </HStack>
            </Center>
            {/*<Text>{chosenPointPick}</Text>*/}

            {props.fighter !== 0 && (
                <Radio.Group
                    name="myRadioGroup"
                    value={chosenPointPick}
                    alignItems="center"
                    m={2}
                    onChange={nextValue => {
                        setChosenPointPick(nextValue);
                    }}
                >
                    <Text align="center">Choose the amount of points:</Text>
                    <HStack space={1} justifyContent="center">
                        {data.scoreOptions.map(option => {
                            return (
                                <Radio key={option} value={option}>
                                    <Text>{option} point(s)</Text>
                                </Radio>
                            );
                        })}
                    </HStack>
                </Radio.Group>
            )}

            <Button
                bg="#059669"
                onPress={() => {
                    setShowModal(true);
                }}
            >
                <Text color="white">Send event</Text>
            </Button>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content>
                    <Modal.CloseButton></Modal.CloseButton>
                    <Modal.Header>Event confirmation</Modal.Header>
                    <Modal.Body>
                        <Text>
                            Are you sure you want to {props.isMainReferee ? 'confirm' : 'suggest'}{' '}
                            an event:{' '}
                        </Text>
                    </Modal.Body>
                    <Modal.Body>{currentStrings.join('')}</Modal.Body>
                    {props.fighter !== 0 && (
                        <Modal.Body>
                            <Text>
                                giving {chosenPointPick} point(s) to {props.fighterName}?
                            </Text>
                        </Modal.Body>
                    )}
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant="ghost"
                                colorScheme="blueGray"
                                onPress={() => {
                                    setShowModal(false);
                                }}
                            >
                                <Text>No</Text>
                            </Button>
                            <Button
                                onPress={() => {
                                    setShowModal(false);
                                    //TODO:
                                    //SEND CURRENT EVENT TO BACKEND - should be ok if we replace current console.log() calls with proper API calls
                                    //NAVIGATE TO THE PREVIOUS SCREEN

                                    // localhost:8080/api/status/{id}/decision - endpoint for changing decision
                                    // localhost:8080/api/status/{id}/points - endpoint for point change - main referee

                                    //remove empty strings used for rewind
                                    setCurrentStrings(currentStrings =>
                                        currentStrings.filter(el => el !== '')
                                    );

                                    const newEvent = {
                                        points1: props.fighter == 1 ? chosenPointPick : 0,
                                        points2: props.fighter == 2 ? chosenPointPick : 0,
                                        token: props.token,
                                        decision: currentStrings,
                                    };
                                    console.log(newEvent);

                                    //if main - should also update point count
                                    //points should not change in the meantime - there is only one main referee
                                    if (props.isMainReferee) {
                                        const newPoints = {
                                            points1:
                                                props.fighter == 1
                                                    ? chosenPointPick + props.points1
                                                    : props.points1,
                                            points2:
                                                props.fighter == 2
                                                    ? chosenPointPick + props.points2
                                                    : props.points2,
                                        };
                                        console.log(newPoints);
                                    }
                                    //THEN NAVIGATE TO THE MATCH DISPLAY AGAIN
                                    //navigate. ...
                                    //CURRENTLY PASSING MATCH HERE, WE WILL ALMOST CERTAINLY CHANGE IT TO REFRESH IN DISPLAYMATCH
                                    navigate('/displayMatch', {
                                        state: {
                                            matchData: props.matchData,
                                            fighter1: props.fighter1,
                                            fighter2: props.fighter2,
                                            userType: props.userType,
                                        },
                                    });
                                }}
                            >
                                <Text>Yes</Text>
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </>
    );
};

export default SuggestPoints;
