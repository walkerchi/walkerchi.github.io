import React from "react"
import HomeLayout from "../layouts/HomeLayout/HomeLayout"
import { Helmet } from "react-helmet"


export default function Home() {
  return (
  <HomeLayout>
  <Helmet>
    <link rel="canonical" href="../images/icon/taichi.white.svg" />
  </Helmet>
  </HomeLayout>
  )
}
