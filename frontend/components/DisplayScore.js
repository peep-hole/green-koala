import { Flex, Center, Text } from 'native-base';
import React from 'react';

const DisplayScore = props => {
    return (
        <Flex
            bg="gray.300"
            p="5%"
            width="100%"
            borderColor="black"
            borderWidth="1"
            rounded="lg"
            flexDirection="row"
            alignItems={'center'}
            mb="20px"
        >
            <Center
                bg="gray.300"
                _text={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: '4xl',
                }}
                width="33%"
                height="64px"
                borderColor="black"
                borderWidth="1"
            >
                {props.fighter1Score}
            </Center>

            <Center width="33%">
                <Text fontSize="md" p="20px">
                    Score
                </Text>
            </Center>

            <Center
                bg="gray.300"
                _text={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: '4xl',
                }}
                width="33%"
                height="64px"
                borderColor="black"
                borderWidth="1"
            >
                {props.fighter2Score}
            </Center>
        </Flex>
    );
};

export default DisplayScore;
