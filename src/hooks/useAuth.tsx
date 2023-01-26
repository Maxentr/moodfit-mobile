import React, { createContext, useContext, useEffect, useState } from "react"
import * as SecureStore from "expo-secure-store"
import jwt_decode from "jwt-decode"
import { API_URL } from "@env"
import Loader from "../components/ui/Loader"

type User = {
  id: number
  name: string
  email: string
  role: string
}

type AuthContextInterface = {
  connectedUser: User | undefined
  login: (accessToken: string, refreshToken: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<boolean>
  authFetch: <T>(
    input: RequestInfo,
    init?: RequestInit | undefined,
  ) => Promise<{ data: T } | { error: unknown }>
}

const AuthContext = createContext({} as AuthContextInterface)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth().then(() => setIsLoading(false))
  }, [])

  const updateUser = (accessToken: string) => {
    const decodedToken: User = jwt_decode(accessToken)

    setUser({
      id: decodedToken.id,
      name: decodedToken.name,
      email: decodedToken.email,
      role: decodedToken.role,
    })
  }

  const login = async (accessToken: string, refreshToken: string) => {
    await SecureStore.setItemAsync("AccessToken", JSON.stringify(accessToken))
    await SecureStore.setItemAsync("RefreshToken", JSON.stringify(refreshToken))

    updateUser(accessToken)
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync("AccessToken")
    await SecureStore.deleteItemAsync("RefreshToken")

    setUser(undefined)
  }

  const updateAccessToken = async (accessToken: string) => {
    await SecureStore.setItemAsync("AccessToken", accessToken)
  }

  const refreshAccessToken = async () => {
    let isAccessTokenRefreshed = false
    try {
      const refreshToken = await SecureStore.getItemAsync("RefreshToken")

      // call api to refresh token
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      })

      const data = await response.json()

      // if valid, update access and user
      if (data?.accessToken) {
        await updateAccessToken(data.accessToken)
        updateUser(data.accessToken)
        isAccessTokenRefreshed = true
      } else {
        // if not valid, logout user
        console.info("logout")

        await logout()
        isAccessTokenRefreshed = false
      }
    } catch (error) {
      console.error(error)
      await logout()
      isAccessTokenRefreshed = false
    }
    return isAccessTokenRefreshed
  }

  const checkAuth = async () => {
    const accessToken = await SecureStore.getItemAsync("AccessToken")
    let isUserValid = false
    if (!accessToken) return isUserValid
    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
      })

      const data = await response.json()

      // if valid, return user data
      if (data?.isValid === true) {
        updateUser(accessToken)
        isUserValid = true
      } else {
        // if not valid, refresh access token
        isUserValid = await refreshAccessToken()
      }
    } catch (error) {
      console.error(error)
      logout()
    }
    return isUserValid
  }

  const authFetch = async <T,>(
    input: RequestInfo,
    init?: RequestInit | undefined,
  ): Promise<{ data: T } | { error: unknown }> => {
    try {
      const accessToken = await SecureStore.getItemAsync("AccessToken")
      const response = await fetch(input, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...init?.headers,
          credentials: "include",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const data = await response.json()

      if (data?.error) {
        throw data.error
      }

      return { data }
    } catch (error) {
      return { error }
    }
  }

  if (isLoading) return <Loader />

  return (
    <AuthContext.Provider
      value={{
        connectedUser: user,
        login,
        logout,
        checkAuth,
        authFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export default AuthProvider
