import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { bp } from "../utils/breakpoints";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  
  @media ${bp.md} {
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr 0fr;
  }

  nav {
      grid-column: span 3;
      background-color: #369;
  }

  main {
      flex: 1;
      @media ${bp.md} {
          grid-column-start:2;
      }
  }


  footer {
      grid-column: span 3;
      background-color: #690;
  }

  aside {
    grid-column-start:3;
  }

  .left {
      grid-column-start:1;
  }
}
`;

type SideMenuProps = { hide: boolean };
const SideMenu = styled.div<SideMenuProps>`
    position: fixed;
  left: 0;
  top: 0;
  background-color: black;
  transition: transform 0.3s cubic-bezier(0, 0.52, 0, 1);
  overflow: ${(props) => (props.hide ? "scroll" : "hidden")}
  z-index: 1599;
  height: 100vh;
  width: 100vw;
  transform: ${(props) =>
    props.hide ? "translate3d(-100vw, 0, 0)" : "translate3d(0vw, 0, 0)"}
  }
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  padding-left: 35px;

  .link {
      color: white;
      max-width: 145px;
      font-size: 1.5rem;
      text-decoration: none;
      padding-bottom: 2rem;
  }
`;

export interface LayoutProps {
  children: React.ReactNode;
}
export const FullLayout = (props: LayoutProps) => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(true);
  const handleMouseDown = (e: any) => {
    console.log("is this working");
    setIsSidebarHidden(!isSidebarHidden);

    e.preventDefault();
  };
  return (
    <Container className="bg-peach">
      <SideMenu hide={isSidebarHidden} onClick={handleMouseDown}>
        <Link className="link" to="/consent-form">
          <span>Consent Form</span>
        </Link>
        <Link className="link" to="/what-is-ar">
          <span>What is AR?</span>
        </Link>
        <Link className="link" to="/">
          <span>Contact Us</span>
        </Link>
      </SideMenu>
      <nav>
        <div className="w-full flex justify-between bg-white items-center">
          <header className="text-xl bg-opacity-75 py-6 pl-4 flex-grow">
            SUN-SPOT
          </header>
          <div
            className="pr-4 cursor-pointer md:hidden bg-opacity-75 py-6"
            onClick={() => setIsSidebarHidden(!isSidebarHidden)}
          >
            <svg
              className="w-6 h-6 stroke-current text-mustard"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul className="hidden md:block md:flex md:justify-between md:items-center">
            <li className="mx-2">
              <div>
                <Link to="/what-is-ar" className="my-2">
                  What Is AR?
                </Link>
              </div>
            </li>
            <li className="mx-1">
              <div>
                <Link to="/consent-form" className="my-2">
                  Consent Form
                </Link>
              </div>
            </li>
            <li className="mx-2">
              <div>
                <Link to="/contact-us" className="my-2">
                  Contact Us
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div className="left bg-peach" />
      <main className="p-8 bg-skin ">{props.children}</main>
      <aside className="bg-peach" />
    </Container>
  );
};
