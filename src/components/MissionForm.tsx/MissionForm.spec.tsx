import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MissionForm } from ".";

function doRender() {
  return render(
    // <Provider store={mockStore}>
    <MemoryRouter>
      <MissionForm />
    </MemoryRouter>
    // </Provider>
  );
}
describe("MissionForm", () => {
  it("Should render the form with all input fields and submit button", () => {
    doRender();
    const nameInput = screen.getByLabelText(/name/i);
    const destinationInput = screen.getByLabelText(/destination/i);
    const departureInput = screen.getByLabelText(/departure/i);
    const submitButton = screen.getByRole("button", { name: /Create/i });

    expect(nameInput).toBeInTheDocument();
    expect(destinationInput).toBeInTheDocument();
    expect(departureInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("Should display a validation message for empty 'name' field on submit attempt", async () => {
    doRender();
    const submitButton = screen.getByRole("button", { name: /Create/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      const nameError = screen.getByText("Mission name is required");
      expect(nameError).toBeInTheDocument();
    });
  });

  it("Should display a validation message for empty 'destination' field on submit attempt", async () => {
    doRender();
    const submitButton = screen.getByRole("button", { name: /Create/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      const destinationError = screen.getByText("Destination is required");
      expect(destinationError).toBeInTheDocument();
    });
  });

  it("Should allow input of a mission name", async () => {
    doRender();
    const nameInput = screen.getByLabelText(/name/i);
    const testMissionName = "Test Mission";

    fireEvent.change(nameInput, { target: { value: testMissionName } });

    expect((nameInput as HTMLInputElement).value).toBe(testMissionName);
  });

  it("Should allow input of a mission destination", async () => {
    doRender();
    const destinationInput = screen.getByLabelText(/destination/i);
    const testMissionDestination = "Test Destination";

    fireEvent.change(destinationInput, {
      target: { value: testMissionDestination },
    });

    expect((destinationInput as HTMLInputElement).value).toBe(
      testMissionDestination
    );
  });

  it("Should allow input of a mission departure date", async () => {
    doRender();
    const departureInput = screen.getByLabelText(/departure/i);
    const testMissionDeparture = "2022-12-31";

    fireEvent.change(departureInput, {
      target: { value: testMissionDeparture },
    });

    expect((departureInput as HTMLInputElement).value).toBe(
      testMissionDeparture
    );
  });

  it("Should allow addition of a pilot member", async () => {
    const { container } = doRender();

    const addButton = screen.getByText(/New Member/i);
    const memberTypeSelect = screen.getByLabelText(/Type/i);
    const experienceInput = screen.getByLabelText(/Experience/i);
    screen.debug(experienceInput, 100000);
    const testExperience = "15";

    // Select 'Pilot' from member type dropdown
    fireEvent.change(memberTypeSelect, { target: { value: "Pilot" } });

    // Input experience
    fireEvent.change(experienceInput, { target: { value: testExperience } });

    // Click 'New Member' button to add the pilot
    fireEvent.click(addButton);

    // Check if the pilot member with the given experience is added
    screen.debug(container, 100000);

    const pilotMember = screen.getAllByText(/Pilot/);
    expect(pilotMember.length).toBe(4);
  });
});

// TODO: Should validate that pilot experience is at least 10
// TODO: Should allow addition of an engineer member
// TODO: Should validate that engineer has one of the specified job specialties
// TODO: Should prevent adding an engineer with a duplicate job specialty
// TODO: Should allow addition of a passenger member
// TODO: Should validate that passenger wealth is one of the specified categories
// TODO: Should enforce that only one pilot can be added
// TODO: Should allow the form to be submitted when all fields are valid
// TODO: Should display an error message if the form submission fails due to server error
// TODO: Should allow the form to be reset to initial state
// TODO: Should allow the form to be cancelled and navigate back without submitting
// TODO: Should prevent past dates from being set as 'departure'
// TODO: Should handle the addition of multiple members of different types
// TODO: Should ensure that the member list correctly discriminates between member types
// TODO: Should ensure that the form adheres to the schema defined for mission form values
// TODO: Should correctly serialize form values for submission
// TODO: Should handle server validation errors and display them to the user
// TODO: Should provide feedback to the user upon successful submission
// TODO: Should maintain form state upon rotation or resizing of the screen (if applicable)
// TODO: Should prevent submission if there is no internet connection (if applicable)
// TODO: Should allow editing of an existing mission (if the form supports edit functionality)
// TODO: Should validate that the departure date is not before the current date
// TODO: Should ensure that the form is accessible and labels and error messages are properly associated with form controls
