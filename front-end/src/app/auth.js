import Credentials from "next-auth/providers/credentials"

export const authOptions = {
    providers:[
        Credentials({
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },

            authorize: async (credentials) => {
                try {
                    const res = await fetch('http://cmsc508.com:8000/~24SP_manoja2/users/login',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password
                        })
                    });

                    const user = await res.json();

                    if (res.ok && user.access_token) {
                        return user;
                    } else {
                        throw new Error('Authentication failed');
                    }
                }
                catch (error) {
                    throw new Error('Request to FastAPI failed: ' + error.message);
                }
            } 
        })
    ],
    session:{
        strategy: "jwt"
    },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        jwt: async ({ token, user }) => {
          // Initial sign in
          if (user) {
            const parts = user.access_token.split('.');
            const payload = JSON.parse(atob(parts[1]));
    
            // Add the decoded payload to the token
            token.accessToken = user.access_token
            token.email = payload.sub;
            token.role = payload.role;
            console.log(token)
          }
          return token;
        },
        session: async ({ session, token }) => {
          session.accessToken = token.accessToken;
          session.role = token.role;
          return session;
        },
      },
}



