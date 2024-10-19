"use client"

import Image from 'next/image'

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand p-2" href="#">
            <Image src={'/logo.png'} alt="logo" width={42} height={42} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"></li>
            </ul>
            <div className="d-flex">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <i className="bi bi-person-bounding-box"></i> Beranda
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/guru">
                    <i className="bi bi-people-fill"></i> Guru
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/rekap">
                    <i className="bi bi-calendar-date"></i> Rekap
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
