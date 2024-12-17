"use client"
import { CustomUser, CustomUserForm } from "@/app/_type/ICustomUser"
import { ChangeEvent, FormEvent, useState } from "react"

export default function SignUp() {
  const [customUser, setCustomUser] = useState<CustomUserForm>({
    username: "",
    password: "",
    repeatPassword: "",
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault() // Prevent reload of page

    setIsLoading(true)

    // Exclude repeat password
    const newUser: CustomUser = {
      username: customUser.username,
      password: customUser.password,
    }

    // POST
    const result = await fetch("http://localhost:8080/api/v1/user", {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(newUser), // TODO - Unsupported Mediatype
    })

    if (result.ok) {
      const data = await result.text()
      console.log(data)
    } else {
      const resultError = await result.json()
      console.error(resultError)
    }

    setIsLoading(false)
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setCustomUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-slate-800">
      <form
        onSubmit={handleOnSubmit}
        method="post"
        className="flex flex-col max-w-sm gap-4"
      >
        {/* Username */}
        <label htmlFor="username">Username</label>
        <input
          className="text-black"
          type="text"
          name="username"
          value={customUser.username}
          onChange={handleChange}
        />

        {/* Password */}
        <label htmlFor="password">Password</label>
        <input
          className="text-black"
          type="password"
          name="password"
          value={customUser.password}
          onChange={handleChange}
        />

        {/* RepeatPassword */}
        <label htmlFor="repeatPassword">Confirm Password</label>
        <input
          className="text-black"
          type="password"
          name="repeatPassword"
          value={customUser.repeatPassword}
          onChange={handleChange}
        />

        {/* FIELD ERRORS */}
        <p></p>

        <button
          className="bg-blue-600 p-4 rounded-md hover:bg-blue-500"
          type="submit"
          disabled={isLoading}
        >
          Sign Up{" "}
          {isLoading ? (
            <span className="inline-block animate-spin">↻</span>
          ) : (
            ""
          )}
        </button>
      </form>
    </div>
  )
}

/** TODO
 *
 * Fetch - POST (JSON, BODY)
 *    Function - Call within button (onclick)
 *
 */
