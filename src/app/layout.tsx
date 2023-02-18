'use client';
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Navbar } from 'react-bootstrap';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  
  return (
    <html lang="en">
      <head />
      <body>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">
            SmartHomeConsole
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/Remote">Remote</Nav.Link>
            </Nav>
        </Navbar.Collapse>
      </Navbar >
      {children}
      </body>
    </html>
  )
}
