import { Box, Flex, Spinner } from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';

const PageLayout = ({children}) => {
    const { pathname } = useLocation()
    const { authUser, loading } = useAuth();
    const canRenderSidebar = pathname !== "/auth" && authUser;
    const canRenderNavbar = !authUser && !loading && pathname !== "/auth"; 

    const checkingUserIsAuth = !authUser && loading; // should be session instead of authUser?
    if (checkingUserIsAuth) return <PageLayoutSpinner />;

    return (
        <Flex flexDir={canRenderNavbar ? "column" : "row"}>
            {/* {Sidebar on the left} */}
            {canRenderSidebar ? (
                <Box w={{base:"70px", md:"240px"}}>
                    <Sidebar />
                </Box>
            ) : null}

            {/* Navbar at the top? */}
            {canRenderNavbar ? <Navbar /> : null}

            {/* Page content on the right */}
            <Box flex={1} w={{base:"calc(100% - 70px)", md:"calc(100% - 240px)"}} mx={"auto"}>
                {children}
            </Box>
        </Flex>
  )
}

export default PageLayout;


const PageLayoutSpinner = () => {
    return (
		<Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
			<Spinner size='xl' />
		</Flex>
	);
};
