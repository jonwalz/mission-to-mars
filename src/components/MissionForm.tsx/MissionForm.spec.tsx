import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MissionForm } from ".";
import { MemoryRouter } from "react-router-dom";

function doRender() {
  render(
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
});

// TODO: Should display default values if any are specified in the form logic
// TODO: Should display a validation message for empty 'name' field on submit attempt
// TODO: Should display a validation message for empty 'destination' field on submit attempt
// TODO: Should display a validation message for empty 'departure' field on submit attempt
// TODO: Should display a validation message for empty 'members' field on submit attempt
// TODO: Should allow input of a mission name
// TODO: Should allow input of a mission destination
// TODO: Should allow input of a mission departure date
// TODO: Should allow addition of a pilot member
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
