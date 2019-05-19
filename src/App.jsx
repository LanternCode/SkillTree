import React, { Component } from "react";
import Skill from "./components/Skill";
import SkillRow from "./components/SkillRow";
import { base } from "./base";
import "./styles/App.css";

class App extends Component {
    state = {
        skills: [
            {
                id: 0,
                name: "Otwieranie Zamków",
                description: "Drewnianych.",
                unlocked: false,
                depth: 1,
                requirements: []
            },
            {
                id: 1,
                name: "Medytacja",
                description: "Przywraca 1 hit. Odnawia się po przespaniu nocy.",
                unlocked: false,
                depth: 1,
                requirements: []
            },
            {
                id: 2,
                name: "Czytanie Hieroglifów",
                description: "Poziom podstawowy.",
                unlocked: false,
                depth: 1,
                requirements: []
            },
            {
                id: 3,
                name: "Rozmowa ze Zwierzętami",
                description: "Małymi.",
                unlocked: false,
                depth: 1,
                requirements: []
            },
            {
                id: 4,
                name: "Nos do Skarbów",
                description: "+5 do rzutów za szukanie skarbu.",
                unlocked: false,
                depth: 2,
                requirements: [0]
            },
            {
                id: 5,
                name: "Wytwarzanie",
                description: "Drewniana Tratwa (6 bali oraz narzędzia)",
                unlocked: false,
                depth: 2,
                requirements: [0, 1]
            },
            {
                id: 6,
                name: "Krąg Ochronny",
                description: "-2 do rzutów za nocną zasadzkę.",
                unlocked: false,
                depth: 2,
                requirements: [1, 2]
            },
            {
                id: 7,
                name: "Infrawizja",
                description: "Tylko parter/pierwsze piętro lokacji.",
                unlocked: false,
                depth: 2,
                requirements: [2, 3]
            },
            {
                id: 8,
                name: "Pielęgnowanie",
                description: "I kultywowanie ogrodów.",
                unlocked: false,
                depth: 2,
                requirements: [3]
            },
            {
                id: 9,
                name: "Otwieranie Zamków",
                description: "Klasycznych.",
                unlocked: false,
                depth: 3,
                requirements: [4, 5]
            },
            {
                id: 10,
                name: "Mała Eksplozja",
                description:
                    "Zaklęcie ofensywne które zadaje 1-4 hit(y) każdemu wrogowi raz podczas walki.",
                unlocked: false,
                depth: 3,
                requirements: [5, 6]
            },
            {
                id: 11,
                name: "Zakup: Flara",
                description:
                    "Odkrywa następną pułapkę jeśli ta została aktywowana i ją neutralizuje.",
                unlocked: false,
                depth: 3,
                requirements: [6, 7]
            },
            {
                id: 12,
                name: "Język Natury",
                description: "Pozwala rozmawiać ze zwierzętami i roślinami.",
                unlocked: false,
                depth: 3,
                requirements: [7, 8]
            },
            {
                id: 13,
                name: "Łowca Okazji",
                description:
                    "Zawsze znajdziesz przynajmniej jedną przecenę w mieście.",
                unlocked: false,
                depth: 4,
                requirements: [9, 10]
            },
            {
                id: 14,
                name: "TBA",
                description: "TBA",
                unlocked: false,
                depth: 4,
                requirements: [10, 11]
            },
            {
                id: 15,
                name: "Uwodzenie",
                description: "Pozwala uwodzić osoby tej samej rasy.",
                unlocked: false,
                depth: 4,
                requirements: [11, 12]
            },
            {
                id: 16,
                name: "TBA",
                description: "TBA",
                unlocked: false,
                depth: 5,
                requirements: [13]
            },
            {
                id: 17,
                name: "TBA",
                description: "TBA",
                unlocked: false,
                depth: 5,
                requirements: [13, 14]
            },
            {
                id: 18,
                name: "TBA",
                description: "TBA",
                unlocked: false,
                depth: 5,
                requirements: [14]
            },
            {
                id: 19,
                name: "TBA",
                description: "TBA",
                unlocked: false,
                depth: 5,
                requirements: [14, 15]
            },
            {
                id: 20,
                name: "TBA",
                description: "TBA",
                unlocked: false,
                depth: 5,
                requirements: [15]
            }
        ],
        maximumSkillPoints: 10,
        currentSkillPoints: 0,
        ownedSkills: [],
        depthReached: 0,
        rowCount: 5,
        statusMessage: "",
        statusMessageType: ""
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

    handleLock = (skill, cannotBeUnlocked) => {
        const skills = [...this.state.skills];

        //cancel skill
        if (skill.unlocked) {
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
        } else if (!cannotBeUnlocked) {
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
        } else {
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
            <div>
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
            </div>
        );
    }
}

export default App;
