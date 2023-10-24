defmodule FmecgElixir.PatientDoctorAssignment do
  use Ecto.Schema
  import Ecto.Changeset

  schema "assignments" do
    field :doctor_id, Ecto.UUID
    field :patient_id, Ecto.UUID

    timestamps()
  end

  @doc false
  def changeset(patient_doctor_assignment, attrs) do
    patient_doctor_assignment
    |> cast(attrs, [:doctor_id, :patient_id])
    |> validate_required([:doctor_id, :patient_id])
  end
end
