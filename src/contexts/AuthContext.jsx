import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../config/supabaseClient";

const AuthContext = createContext({ session:null, authUser:null, signOut: () => {} });

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState()
    const [session, setSession] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const setData = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) throw error;
            setSession(session)
            setAuthUser(session?.user)
            setLoading(false);
        };

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setAuthUser(session?.user)
            setLoading(false)
        });

        setData();

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);

    const value = {
        session,
        authUser,
        loading,
        signOut: () => supabase.auth.signOut(),
    };

    // use a provider to pass down the value
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// export the useAuth hook
export const useAuth = () => {
    return useContext(AuthContext);
};



// V1 ROGER/CHATGPT

// import { createContext, useContext, useState, useEffect } from "react";
// import supabase from "../config/supabaseClient";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true); // New loading state

//   useEffect(() => {
//     const fetchSession = async () => {
//       const { data: { session }, error } = await supabase.auth.getSession();
//       if (error) {
//         console.error("Error fetching session:", error);
//       }
//       setSession(session);
//       setLoading(false);
//       console.log("Initial Session:", session);
//     };

//     fetchSession();

//     const { data: {subscription} } = supabase.auth.onAuthStateChange((event, session) => {
//       setSession(event === "SIGNED_IN" ? session : null);
//       setLoading(false);
//       console.log("Auth State Changed:", { event, session });
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ session, loading }}>
//       {console.log("AuthContext Provider Session:", session)}
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };






// V2 CHATGPT
// import { createContext, useContext, useState, useEffect } from "react";
// import supabase from "../config/supabaseClient";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSession = async () => {
//       // Try to get the session from the client first
//       const { data: { session } } = await supabase.auth.getSession();

//       if (session) {
//         setSession(session);
//         setLoading(false);
//         console.log("Initial Session from getSession:", session);
//       } else {
//         // Fallback to fetching the user from the server
//         const { data: { user }, error } = await supabase.auth.getUser();
//         if (error) {
//           console.error("Error fetching user:", error);
//         } else if (user) {
//           setSession({ user }); // Construct a session-like object
//           console.log("Session from getUser:", { user });
//         }
//         setLoading(false);
//       }
//     };

//     fetchSession();

//     const { data: {subscription} } = supabase.auth.onAuthStateChange((event, session) => {
//       setSession(event === "SIGNED_IN" ? session : null);
//       setLoading(false);
//       console.log("Auth State Changed:", { event, session });
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ session, loading }}>
//       {console.log("AuthContext Provider Session:", session)}
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
