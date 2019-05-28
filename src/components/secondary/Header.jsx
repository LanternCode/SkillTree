import React from "react";
import { app } from "../../base";

const Header = () => {
    return (
        <>
            <p>Welcome to SkillTree</p>
            <button onClick={e => app.auth().signOut()}>Sign Out</button>
            <br />
            <br />
        </>
    );
};

export default Header;
