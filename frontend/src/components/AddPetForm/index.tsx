import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../services/api";

import { Pet } from "../../types";
import { Container } from "./styles";

interface AddPetFormProps {
  handleClose: () => void;
}

const AddPetForm = ({ handleClose }: AddPetFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<Pet>();

  // Adicionar toasts para os erros ou successos
  const onSubmit = handleSubmit(async (data) => {
    handleClose();
    api
      .post("pets", data)
      .then((response) => toast.success("Animal cadastrado com sucesso"))
      .catch((response) => toast.error("Erro no cadastro."));
  });

  useEffect(() => {
    reset({ name: "", age: 0, breed: "", tutorName: "", tutorPhone: "" });
  }, [isSubmitSuccessful]);

  return (
    <Container>
      <h2>Cadastro de pet</h2>
      <form onSubmit={onSubmit}>
        <label>Nome</label>
        <input {...register("name")} />
        <label>Idade</label>
        <input {...register("age")} />
        <label className="type">Tipo</label>
        <select {...register("type")}>
          <option value="Cat">Gato</option>
          <option value="Dog">Cachorro</option>
        </select>
        <label>Raça</label>
        <input {...register("breed")} />
        <label>Nome do tutor</label>
        <input {...register("tutorName")} />
        <label>Telefone do tutor</label>
        <input {...register("tutorPhone")} />
        <button type="submit">Cadastrar</button>
      </form>
    </Container>
  );
};

export default AddPetForm;
