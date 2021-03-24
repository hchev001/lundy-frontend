import styled from "styled-components";
import { bp } from "../utils/breakpoints";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FullLayout } from "../layout/FullLayout";
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
export const Disclaimer = () => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(true);
  const handleMouseDown = (e: any) => {
    console.log("is this working");
    setIsSidebarHidden(!isSidebarHidden);

    e.preventDefault();
  };
  return (
    <FullLayout>
      <div className="w-full flex justify-center">
        <h1 className="text-2xl">Consent Form</h1>
      </div>
      <div className="text-base">
        <p>
          Purpose & Procedures: You are invited to take part in a research
          study. Doing so is voluntary. The purpose of this research is to test
          and to evaluate the effectiveness of a website which is designed to
          provide an interactive experience for the users. The study will take
          about 20 to 25 minutes to finish. You will be asked to thoroughly
          interact with the website and its features. Then, you will be asked to
          complete a brief survey on your perceptions regarding your experience.
        </p>
        <p>
          Requirements: You must be at least 18 years old to participate in the
          study. Risks: Taking part in the study involves no risks and
          discomfort that are no greater than those ordinarily encountered in
          daily life or during other online activities.
        </p>
        <p>
          Benefits: No direct benefit can be promised to you for being in this
          study.
        </p>
        <p>
          Compensation: You will receive extra credits for your participation.
        </p>
        <p>
          Voluntary Participation: Your participation in this study is
          voluntary.
        </p>
        <p>
          You do not have to be in this study if you do not want to, and you can
          leave the study at any time. You will not lose any services, benefits,
          or rights you would normally have if you chose not to be in the study
          or if you leave the study early. Confidentiality: No personally
          identifying information will be stored. All electronic files
          containing identifiable information will be password-protected. Only
          the members of the research staff will have access to the passwords.
          You may choose to withdraw your data at the end of the survey when the
          information is revealed. At the end of this study, the researchers may
          publish their findings. Information will be presented in summary
          format and you will not be identified in any publications or
          presentations.
        </p>
        <p>
          Contact: If you have any questions or concerns about the research,
          please contact Ms. Di Lun at (305) 284-8605 or dxl744@miami.edu. If
          you have questions regarding your rights as a research participant,
          contact the University of Miami, Human Subject Research Office at
          hsro@med.miami.edu or 305-243-3195.
        </p>
      </div>
      <div>
        <span>
          By clicking “next”, you confirm that you are 18 years old or older,
          you have read and understood the instructions above, and that you are
          willing to participate in this study.
        </span>
      </div>
      <div>
        <button
          type="button"
          className="mt-4 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2"
        >
          Next
        </button>
      </div>
    </FullLayout>
  );
};
