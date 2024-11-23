import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react';
import SuggestedUser from './SuggestedUser';
import SuggestedHeader from './SuggestedHeader';

const SuggestedUsers = () => {
  return ( 
    <VStack py={8} px={6} gap={4}>
        <SuggestedHeader/>
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"} >
            <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
                Suggested for you
            </Text>
            <Text fontSize={12} fontWeight={"bold"} _hover={{color: "gray.400"}} cursor={"pointer"}>
                See All
            </Text>
        </Flex>

        <SuggestedUser name="Dan abramov" followers={1234} avatar="https://bit.ly/dan-abramov"/>
        <SuggestedUser name="Ryan Florence" followers={574} avatar="https://bit.ly/ryan-florence"/>
        <SuggestedUser name="Christian Nwamba" followers={796} avatar="https://bit.ly/code-beast"/>

        <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}> 
            @ 2023 Built by {" "}
            <Link href="https://linkedin.com/in/roger-galan-manzano-819babb9/" target="_blank" color={"blue.500"} fontSize={14}>
            Rawwyurr
            </Link>
        </Box>
    </VStack>
    );
};

export default SuggestedUsers;
