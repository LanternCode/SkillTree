import React, { Component } from "react";
import "../styles/Skill.css";

class Skill extends Component {
    render() {
        let className = "skill skill-depth-" + this.props.skill.depth;

        let cannotBeUnlocked = this.props.skill.depth !== 1 ? true : false;
        this.props.skill.requirements.map(requiredSkill => {
            if (this.props.unlockedSkills.includes(requiredSkill))
                cannotBeUnlocked = false;
            return null;
        });

        className = cannotBeUnlocked
            ? className + " skill-cannotBeUnlocked"
            : this.props.skill.unlocked
            ? className + " skill-unlocked"
            : className;

        return (
            <div
                className={className}
                onClick={() => {
                    this.props.handleLock(this.props.skill, cannotBeUnlocked);
                }}
            >
                {this.props.hidden ? (
                    "?"
                ) : (
                    <span className="skillName">{this.props.skill.name}</span>
                )}
                <br />
                {this.props.hidden ? (
                    ""
                ) : (
                    <span className="skillDescription">
                        {this.props.skill.description}
                    </span>
                )}
            </div>
        );
    }
}

export default Skill;
