import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="">
      <h1>404 </h1>
      <h2>Pagina não encontrada</h2>
      <Link to="/"> Voltar para a pagina inicial</Link>
    </div>
  );
}
