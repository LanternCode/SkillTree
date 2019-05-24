import React, { Component } from "react";

class AddSkillForm extends Component {
    state = {
        sName: "",
        sDesc: "",
        sDepth: "",
        sReqs: ""
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.sName && this.state.sDesc && this.state.sDepth) {
            let toReturn = this.state;
            this.setState({ sName: "", sDesc: "", sDepth: "", sReqs: "" });
            return this.props.handleNewSkill(toReturn);
        }
    };

    handleInput = event => {
        let inputFieldName = event.target.name;

        if (inputFieldName === "SkillName") {
            this.setState({ sName: event.target.value });
        } else if (inputFieldName === "SkillDescription") {
            this.setState({ sDesc: event.target.value });
        } else if (inputFieldName === "SkillDepth") {
            this.setState({ sDepth: event.target.value });
        } else if (inputFieldName === "SkillRequirements") {
            this.setState({ sReqs: event.target.value });
        }
    };

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <h2>Add New Skill</h2>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="SkillName"
                            value={this.state.sName}
                            onChange={this.handleInput}
                        />
                    </label>
                    <br />
                    <label>
                        Description:
                        <input
                            type="text"
                            name="SkillDescription"
                            value={this.state.sDesc}
                            onChange={this.handleInput}
                        />
                    </label>
                    <br />
                    <label>
                        Row:
                        <input
                            type="number"
                            name="SkillDepth"
                            value={this.state.sDepth}
                            onChange={this.handleInput}
                        />
                    </label>
                    <br />
                    <label>
                        Requirements:
                        <input
                            type="text"
                            name="SkillRequirements"
                            value={this.state.sReqs}
                            onChange={this.handleInput}
                        />
                    </label>
                    <input type="submit" value="+" />
                </form>
            </>
        );
    }
}

export default AddSkillForm;
