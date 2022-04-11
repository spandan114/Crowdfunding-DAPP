import Navbar from '../components/Navbar';

const authWrapper = (WrappedComponent) => {
    // eslint-disable-next-line react/display-name
    return (props) => {
    //   if (typeof window !== "undefined") {
    //     const router = useRouter();
  
    //     const accessToken =
    //       localStorage.getItem("TOKEN") || localStorage.getItem("SETUP_TOKEN");
  
    //     console.log(accessToken);
    //     // If there is no access token we redirect to "/" page.
    //     if (!accessToken) {
    //       router.replace("/auth?type=login");
    //       return null;
    //     }
  
        // If this is an accessToken we just render the component that was passed with all its props
        return (
          <>
            <Navbar/>
            <WrappedComponent {...props} />
          </>
        );
    //   }
  
    //   return null;
    };
  };

export default authWrapper