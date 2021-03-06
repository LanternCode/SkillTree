import React, { Component } from "react";
import Skill from "./secondary/Skill";
import SkillRow from "./secondary/SkillRow";
import AddSkillForm from "./secondary/AddSkillForm";
import { base } from "../base";
import "../styles/App.css";

class SkillTree extends Component {
    state = {
        skills: [],
        maximumSkillPoints: 10,
        currentSkillPoints: 0,
        ownedSkills: [],
        depthReached: 0,
        rowCount: 5,
        statusMessage: "",
        statusMessageType: "",
        allowSkillAddition: true,
        allowSkillCancelling: true
    };

    componentWillMount() {
        this.skillRef = base.syncState("skills", {
            context: this,
            state: "skills"
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.skillRef);
    }

    handleNewSkill = skill => {
        let skills = [...this.state.skills];

        let skillReqs = skill.sReqs.split(",").map(skillReq => {
            return Number(skillReq) - 1;
        });

        skills.push({
            id: skills.length,
            name: skill.sName,
            description: skill.sDesc,
            unlocked: false,
            depth: Number(skill.sDepth),
            requirements: skillReqs
        });

        this.setState({ skills });
    };

    handleLock = (skill, cannotBeUnlocked) => {
        const skills = [...this.state.skills];
        let attemptedCancelPrevented = false;

        //cancel skill
        if (skill.unlocked && this.state.allowSkillCancelling) {
            let allowCancel = true;
            let allowCancelCounter = 0;
            let oldAllowCancel = true;
            let allowCancelChanged = false;
            this.state.skills.map(singleSkill => {
                if (
                    singleSkill.requirements.includes(skill.id) &&
                    singleSkill.unlocked
                ) {
                    allowCancel = false;
                    let appearedIn = 0;

                    singleSkill.requirements.map(singleReq => {
                        if (skills[singleReq].unlocked) appearedIn++;
                        return null;
                    });
                    allowCancelCounter++;
                    allowCancel = appearedIn === 2 ? true : false;
                    if (allowCancelCounter === 1) oldAllowCancel = allowCancel;

                    if (allowCancelCounter === 2)
                        allowCancelChanged =
                            allowCancel === oldAllowCancel ? false : true;
                }

                return null;
            });

            if (allowCancel && allowCancelChanged === false) {
                const currentSkillPoints = this.state.currentSkillPoints - 1;
                this.setState({ currentSkillPoints });
                skill.unlocked = !skill.unlocked;
                skills[skill.id] = skill;

                let ownedSkills = [...this.state.ownedSkills];

                ownedSkills.map((mapedSkill, i) => {
                    if (mapedSkill === skill.id) {
                        ownedSkills[i] = null;
                    }
                    return null;
                });
                ownedSkills = ownedSkills.filter(id => {
                    if (id === 0) return "0";
                    else return id != null;
                });
                this.setState({ ownedSkills });

                let depthRemoved = true;
                this.state.skills.map(playerSkill => {
                    if (
                        skill.id !== playerSkill.id &&
                        playerSkill.depth === this.state.depthReached &&
                        playerSkill.unlocked === true
                    )
                        depthRemoved = false;
                    return null;
                });

                if (depthRemoved) {
                    let depthReached = this.state.depthReached - 1;
                    this.setState({ depthReached });
                }

                this.setState({ skills });

                let statusMessage = "You have succesfully cancelled a skill.";
                this.setState({ statusMessage });

                let statusMessageType = "success";
                this.setState({ statusMessageType });
            } else {
                let statusMessage =
                    "You cannot cancel this skill because you have already unlocked another skill requiring this skill.";
                this.setState({ statusMessage });

                let statusMessageType = "error";
                this.setState({ statusMessageType });
            }
        } else if (skill.unlocked) {
            let statusMessage =
                "You are not allowed to cancel skills, contact the GM to enable that function.";
            this.setState({ statusMessage });
            let statusMessageType = "error";
            this.setState({ statusMessageType });
            attemptedCancelPrevented = true;
        } else if (!cannotBeUnlocked && attemptedCancelPrevented === false) {
            //buy new skill
            const currentSkillPoints = this.state.currentSkillPoints + 1;
            if (currentSkillPoints <= this.state.maximumSkillPoints) {
                this.setState({ currentSkillPoints });
                skill.unlocked = !skill.unlocked;
                skills[skill.id] = skill;

                const ownedSkills = [skill.id, ...this.state.ownedSkills];
                this.setState({ ownedSkills });

                const depthReached = skill.depth;
                if (depthReached > this.state.depthReached)
                    this.setState({ depthReached });

                this.setState({ skills });

                let statusMessage = "Success! You have unlocked a new skill!";
                this.setState({ statusMessage });
                let statusMessageType = "success";
                this.setState({ statusMessageType });
            }
        } else if (attemptedCancelPrevented === false) {
            let statusMessage =
                "This skill cannot be unlocked as it requires a preceeding skill.";
            this.setState({ statusMessage });
            let statusMessageType = "error";
            this.setState({ statusMessageType });
        }
    };

    render() {
        //make all rows that will contain skills
        let skillRows = [];
        for (let i = 0; i < this.state.rowCount; ++i) {
            skillRows.push(
                <SkillRow
                    key={i}
                    rowDepth={i + 1}
                    toDisplay={this.state.skills.map(skill => {
                        //map all skills to their rows
                        return skill.depth === i + 1 ? (
                            <Skill
                                key={skill.id}
                                skill={skill}
                                unlockedSkills={this.state.ownedSkills}
                                hidden={
                                    skill.depth > this.state.depthReached + 1
                                        ? true
                                        : false
                                }
                                handleLock={this.handleLock}
                            />
                        ) : null; //if skill does not match to that row, return null
                    })}
                />
            );
        }

        //what will be displayed on screen
        return (
            <>
                Remaining Skill Points:{" "}
                {this.state.maximumSkillPoints - this.state.currentSkillPoints}
                <span
                    className={
                        "statusMessage " +
                        "statusMessage--" +
                        this.state.statusMessageType
                    }
                >
                    {this.state.statusMessage}
                </span>
                <div className="skills">
                    <br />
                    {skillRows}
                </div>
                {this.state.allowSkillAddition ? (
                    //if the allowSkillAddition is true, display the "Add New Skill" form
                    <AddSkillForm handleNewSkill={this.handleNewSkill} />
                ) : null}
            </>
        );
    }
}

export default SkillTree;
