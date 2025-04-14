import { useState } from "react";
import png from "../assets/no-projects.png";

import { getCurrentDateTime } from "../utils/dateTime";
import Tasks from "./Tasks";
import MarkdownDisplay from "./MarkdownDisplay";

export default function ProjectDisplay({
	projectDetails,
	handleNewProject,
	setProjectDetails,
	selectedProject = null,
}) {
	let currentProjectId = selectedProject
		? selectedProject
		: Object.keys(projectDetails)[Object.keys(projectDetails).length - 1];
	let currentProject = { ...projectDetails[currentProjectId] };

	const [titleStatus, setTitleStatus] = useState(false);

	function handleTitleStatus() {
		setTitleStatus((status) => !status);
	}

	function handleTitleChange(e) {
		setProjectDetails((projectsArray) => {
			const newProject = {
				...projectsArray,
				[currentProjectId]: {
					...projectsArray[currentProjectId],
					title: e.target.value,
					dateModified: getCurrentDateTime(),
				},
			};
			return newProject;
		});
	}

	function handleDueDateChange(e) {
		setProjectDetails((projectsArray) => {
			const newProject = {
				...projectsArray,
				[currentProjectId]: {
					...projectsArray[currentProjectId],
					dueDate: e.target.value,
					dateModified: getCurrentDateTime(),
				},
			};
			return newProject;
		});
	}

	return (
		<>
			{Object.keys(projectDetails).length ? (
				<div className="custome_scrollbar flex h-screen flex-5 flex-col overflow-y-auto">
					<div
						className={`flex h-1/5 flex-none ${currentProject.bgImage} pl-7 font-sans`}
					>
						<div className="flex flex-auto items-end justify-start pb-6 text-5xl font-bold text-stone-950">
							{titleStatus ? (
								<input
									autoFocus
									className="rounded border-2 border-violet-500"
									type="text"
									placeholder={currentProject.title}
									value={currentProject.title}
									onChange={handleTitleChange}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											handleTitleStatus();
										}
									}}
								/>
							) : (
								<div
									className="cursor-pointer rounded border-2 border-transparent hover:border-sky-400"
									onClick={handleTitleStatus}
								>
									{currentProject.title}
								</div>
							)}
						</div>
						<div className="flex flex-col pr-5">
							<div className="flex flex-1 justify-end">
								<div>{currentProject.dateModified}</div>
							</div>
							<div className="flex flex-1 items-end justify-end">
								<div>
									<span className="font-bold">Due Date</span>{" "}
									:{" "}
									<input
										className="cursor-pointer rounded border-2 border-transparent hover:border-sky-400"
										type="date"
										name=""
										id=""
										onChange={handleDueDateChange}
										value={currentProject.dueDate}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="mx-4 my-4 flex flex-none flex-col bg-stone-200 py-4 pl-7">
						<div className="pb-4 font-sans text-2xl font-bold underline">
							Important Tasks
						</div>
						<Tasks
							tasks={currentProject.tasks}
							projectDetails={projectDetails}
							setProjectDetails={setProjectDetails}
							currentProjectId={currentProjectId}
						/>
					</div>
					<MarkdownDisplay
						projectDetails={projectDetails}
						setProjectDetails={setProjectDetails}
						currentProjectId={currentProjectId}
					/>
				</div>
			) : (
				<div className="flex h-screen flex-5 flex-col items-center justify-center gap-4 overflow-y-auto">
					<img src={png} alt="" width={100} />
					<div className="text-3xl">No Project Selected</div>
					<div className="text-xl text-stone-400">
						Select a Project or get started with a new one
					</div>
					<button
						onClick={handleNewProject}
						className="rounded-2xl bg-stone-800 px-5 py-4 text-xl text-stone-400"
					>
						Create new project
					</button>
				</div>
			)}
		</>
	);
}
