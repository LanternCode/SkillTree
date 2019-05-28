import React, { Component } from "react";
import "../../styles/Skill.css";

class SkillRow extends Component {
    render() {
        return (
            <div className={"SkillRow--" + this.props.rowDepth}>
                {this.props.toDisplay}
            </div>
        );
    }
}

export default SkillRow;
