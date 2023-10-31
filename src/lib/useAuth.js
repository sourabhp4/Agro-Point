
export default async function useAuth() {
    try {
        // const response = await fetch(
        //     `http://localhost:3000/api/users/checkAuthenticated`, { method: "GET" }
        // )
        // const data = await response.json()
        // if (data.status === 200) return {user: data.user, status: true}
        // else
         return {user: null, status: false}
    } catch (err) {
        return {user: null, status: false}
    }
}
