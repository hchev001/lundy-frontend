import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { actions, Transitions } from "../store/modules/Events";
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
      max-width: 150px;
      font-size: 1.5rem;
      text-decoration: none;
      padding-bottom: 2rem;
  }
`;

export interface LayoutProps {
  children: React.ReactNode;
}

enum Paths {
  WHAT_IS_AR = "/what-is-ar",
  CONTACT_US = "/contact-us",
  CONSENT_FORM = "/consent-form",
}
export const FullLayout = (props: LayoutProps) => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleMouseDown = (e: any) => {
    setIsSidebarHidden(!isSidebarHidden);

    e.preventDefault();
  };

  const handleLinkClick = (path: string): void => {
    console.log(path, "inside here");
    if (path === Paths.CONSENT_FORM) {
      dispatch(actions.clickLink(Transitions.CLICK_CONSENT_FORM));
    } else if (path === Paths.CONTACT_US) {
      dispatch(actions.clickLink(Transitions.CLICK_CONTACT_US));
    } else if (path === Paths.WHAT_IS_AR) {
      dispatch(actions.clickLink(Transitions.CLICK_WHAT_IS_AR));
    }
    history.push(path, { from: path });
  };
  return (
    <Container className="bg-peach">
      <SideMenu hide={isSidebarHidden} onClick={handleMouseDown}>
        <button
          className="link"
          onClick={() => handleLinkClick(Paths.CONSENT_FORM)}
        >
          <span>Consent Form</span>
        </button>
        <button
          className="link"
          onClick={() => handleLinkClick(Paths.WHAT_IS_AR)}
        >
          <span>What is AR?</span>
        </button>
        <button
          className="link"
          onClick={() => {
            handleLinkClick(Paths.CONTACT_US);
          }}
        >
          <span>Contact Us</span>
        </button>
      </SideMenu>
      <nav>
        <div className="w-full flex justify-between bg-white items-center">
          <header className="text-xl bg-opacity-75 py-6 pl-4 flex-grow">
            <span onClick={() => history.push("/")} className="cursor-pointer">
              SUN-SPOT
            </span>
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
                <button
                  onClick={() => handleLinkClick(Paths.WHAT_IS_AR)}
                  className="my-2"
                >
                  What Is AR?
                </button>
              </div>
            </li>
            <li className="mx-1">
              <div>
                <button
                  onClick={() => handleLinkClick(Paths.CONSENT_FORM)}
                  className="my-2"
                >
                  Consent Form
                </button>
              </div>
            </li>
            <li className="mx-2">
              <div>
                <button
                  onClick={() => handleLinkClick(Paths.CONTACT_US)}
                  className="my-2"
                >
                  Contact Us
                </button>
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
