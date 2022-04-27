import { Flex, Center, Text } from 'native-base';

const DisplayScore = props => {
    return (
        <Flex
            bg="gray.300"
            p="5%"
            width="auto"
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
                width="120px"
                height="64px"
                borderColor="black"
                borderWidth="1"
            >
                {props.fighter1Score}
            </Center>

            <Center>
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
                width="120px"
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
