
//@ts-nocheck
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { actions, selectors, Transitions } from "../store/modules/Events";
import { bp } from "../utils/breakpoints";
import mobile_banner from "../common/assets/mobile_banner.png";
import { GiHamburgerMenu } from "react-icons/gi"
import resolveConfig from "tailwindcss/resolveConfig"
import tailwind from "../common/tailwind.config";
import { BannerSvg, BannerSvg2 } from "../common/assets";
import BannerImg from "../common/assets/banners/Banner.png"
import SvgSun from "../common/assets/sun/sun";
const {theme} = resolveConfig(tailwind);
const {colors} = theme;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;


  main {
    flex: 1;
  }
  
`;

type SideMenuProps = { hide: boolean };
const SideMenu = styled.div<SideMenuProps>`
  position: fixed;
  left: 0;
  top: 0;
  background-color: black;
  transition: transform 0.3s cubic-bezier(0, 0.52, 0, 1);
  overflow: ${(props) => (props.hide ? "scroll" : "hidden")};
  z-index: 1599;
  height: 100vh;
  width: 100vw;
  transform: ${(props) =>
    props.hide ? "translate3d(-100vw, 0, 0)" : "translate3d(0vw, 0, 0)"};
  transition: transform 500ms ease-out;
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
  backgroundImage?: any;
}

enum Paths {
  WHAT_IS_AR = "/what-is-ar",
  CONTACT_US = "/contact-us",
  CONSENT_FORM = "/consent-form",
}
export const FullLayout = (props: LayoutProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isMenuOpen = useSelector(selectors.isMenuOpen);

  const handleMouseDown = (e: any) => {
    dispatch(actions.hideMenu());

    e.preventDefault();
  };

  const handleLinkClick = (path: string): void => {
    if (path === Paths.CONSENT_FORM) {
      dispatch(actions.clickLink(Transitions.CLICK_CONSENT_FORM));
    } else if (path === Paths.CONTACT_US) {
      dispatch(actions.clickLink(Transitions.CLICK_CONTACT_US));
    } else if (path === Paths.WHAT_IS_AR) {
      dispatch(actions.clickLink(Transitions.CLICK_WHAT_IS_AR));
    }

    history.push(path, { from: path });
    dispatch(actions.hideMenu());
  };
  return (
    <Container  bgImage={props.backgroundImage}>
      <SideMenu hide={!isMenuOpen} onClick={handleMouseDown}>
        <button
          className="w-full text-white text-2xl inline-flex justify-start my-4 hover:text-red-100 focus:outline-none"
          onClick={() => handleLinkClick(Paths.CONSENT_FORM)}
        >
          <span>Consent Form</span>
        </button>
        <button
          className="w-full text-white text-2xl inline-flex justify-start my-4 hover:text-red-100 focus:outline-none"
          onClick={() => handleLinkClick(Paths.WHAT_IS_AR)}
        >
          <span>What is AR?</span>
        </button>
        <button
          className="w-full text-white text-2xl inline-flex justify-start my-4 hover:text-red-100 focus:outline-none"
          onClick={() => {
            handleLinkClick(Paths.CONTACT_US);
          }}
        >
          <span>Contact Us</span>
        </button>
      </SideMenu>
      <Nav2 onClick={() => dispatch(actions.toggleMenu())} />
      <main className=" bg-sand-400 container mx-auto">
        {props.children}
      </main>
    </Container>
  );
};

const StNav = styled.div`
    background-image: url(${props => props.bannerImage});
    background-size: 100% 129px;
    height: 129px;
    position: relative;
    
    .sun {
      position: absolute;
      top: -16px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 80px;
    }

    .slogan {
      position: absolute;
      top: 40px;
      left: 32px;
    }

    .placeholder {
      height: 129px;
      position: relative;
    }

    .burger {
      position: absolute;
      top: 16px;
      right: 16px;
      height: 32px;
      width: 32px;
      cursor: pointer;
    }
  `;
const Nav2 = ({onClick}) => {
  
  return (

    <StNav bannerImage={BannerImg} className="bg-no-repeat">
      <SvgSun className={"sun"}/>
      <div className="slogan">
        <div className="text-lg font-bold tracking-widest font-serif uppercase text-white">Protect</div>
        <div className='font-bold font-serif tracking-widest uppercase text-mustard-400'>All The Skin You're In</div>
      </div>
      <div
        className="pr-4 md:hidden bg-opacity-75 py-6 placeholder"
      >
        <GiHamburgerMenu color={colors.dirtysand['400']} className='burger' height={32} width={32} onClick={() => onClick()}/>
      </div>
    </StNav>
  );
};
