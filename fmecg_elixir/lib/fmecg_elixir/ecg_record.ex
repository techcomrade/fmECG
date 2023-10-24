defmodule FmecgElixir.ECGRecord do
  use Ecto.Schema
  import Ecto.Changeset

  schema "records" do
    field :user_id, Ecto.UUID
    field :device_id, Ecto.UUID
    field :data_directory, :string
    field :start_time, :naive_datetime
    field :stop_time, :naive_datetime

    timestamps()
  end

  @doc false
  def changeset(ecg_record, attrs) do
    ecg_record
    |> cast(attrs, [:user_id, :device_id, :data_directory, :start_time, :stop_time])
    |> validate_required([:user_id, :device_id, :data_directory, :start_time, :stop_time])
  end
end
