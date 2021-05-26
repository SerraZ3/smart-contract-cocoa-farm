import React, { useEffect, useState } from "react";
// Informação do contrato
import farm from "../../contracts/farm.contract";
// Configuração para requisições na rede
import web3 from "../../contracts/web3";
import "./style.css";

// Verifica se o numero é menor que 10 e poe um 0 na frente
const checkZero = (val) => {
  return val < 10 ? "0" + val : val;
};
// Função que transforma timestamp em dd/mm/yyyy hh:mm:ss
const converteHorario = (timestamp) => {
  var date = new Date(timestamp);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var ddmmmyyyy =
    checkZero(date.getDate()) +
    "/" +
    checkZero(date.getMonth() + 1) +
    "/" +
    date.getFullYear();
  var formattedTime =
    ddmmmyyyy +
    " " +
    hours +
    ":" +
    minutes.substr(-2) +
    ":" +
    seconds.substr(-2);

  return formattedTime;
};

function Home() {
  const [farmName, setFarmName] = useState("");
  const [harvestInfo, setHarvestInfo] = useState(null);
  const [harvests, setHarvests] = useState([]);
  const [loadingInsertHarvests, setLoadingInsertHarvests] = useState(false);
  const [loadingBuyHarvests, setLoadingBuyHarvests] = useState(false);
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [harvestPosition, setHarvestPosition] = useState("");
  const [harvestPositionSearch, setHarvestPositionSearch] = useState("");

  const pegarNomeFazenda = async () => {
    try {
      const name = await farm.methods.name().call();

      setFarmName(name);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearchHarvest = async (e) => {
    e.preventDefault();
    try {
      const response = await farm.methods
        .harvests(parseInt(harvestPositionSearch) - 1)
        .call();

      setHarvestInfo(response);
    } catch (error) {
      setHarvestInfo(null);
      console.log(error);
    }
  };

  const listHarvest = async () => {
    try {
      const response = await farm.methods.listHarvest().call();
      setHarvests(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleInsertHarvest = async (e) => {
    e.preventDefault();
    try {
      setLoadingInsertHarvests(true);
      const timestamp = new Date().getTime();
      const contas = await web3.eth.getAccounts();
      const response = await farm.methods
        .insertHarvest(parseInt(price), parseInt(size), timestamp)
        .send({ from: contas[0] });

      console.log(response);
      setLoadingInsertHarvests(false);
    } catch (error) {
      setLoadingInsertHarvests(false);
      alert("Ops, erro no cadastro de lote");
      console.log(error);
    }
  };
  const handleBuyHarvest = async (e) => {
    e.preventDefault();
    try {
      setLoadingBuyHarvests(true);
      const contas = await web3.eth.getAccounts();
      const response = await farm.methods
        .buyHarvest(parseInt(harvestPosition) - 1)
        .send({
          from: contas[0],
          value: parseInt(harvests[parseInt(harvestPosition) - 1].price),
        });

      console.log(response);
      setLoadingBuyHarvests(false);
    } catch (error) {
      setLoadingBuyHarvests(false);
      alert("Ops, erro no cadastro de lote");
      console.log(error);
    }
  };
  useEffect(() => {
    pegarNomeFazenda();
    listHarvest();
  }, []);
  return (
    <div>
      <h1>Contrato da fazenda: {farmName}</h1>
      <div className="divider" />
      <h2>Listagem de lotes</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Valor (WEI)</th>
            <th>Tamanho do lote (kg)</th>
            <th>Data</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Mostra informação das leituras */}
          {harvests.map((harvest, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{harvest.price}</td>
              <td>{harvest.size}</td>
              <td>{converteHorario(parseInt(harvest.timestamp))}</td>
              {harvest.owner ===
              "0x0000000000000000000000000000000000000000" ? (
                <td style={{ color: "green" }}>Disponível</td>
              ) : (
                <td style={{ color: "red" }}>Indisponível</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {!(harvests.length > 0) ? (
        <h4>Nenhuma leitura cadastrada no servidor</h4>
      ) : null}

      <br />
      <br />
      <div className="divider" />

      <form onSubmit={handleInsertHarvest}>
        <div className="content">
          <h2>Cadastro de lote de amêndoa</h2>
          <input
            placeholder="Digite o preço do lote"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          <input
            placeholder="Digite o tamanho do lote"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Cadastrar</button>
        </div>
      </form>

      {loadingInsertHarvests ? (
        <h5>Processando cadastro de lote...</h5>
      ) : (
        <>
          <br />
          <br />
        </>
      )}

      <div className="divider" />
      <form onSubmit={handleBuyHarvest}>
        <div className="content">
          <h2>Comprar Lote</h2>
          <input
            placeholder="Digite o id do lote"
            value={harvestPosition}
            onChange={(e) => setHarvestPosition(e.target.value)}
          />
          <br />
          <br />

          <button type="submit">Comprar</button>
        </div>
      </form>
      {loadingBuyHarvests ? (
        <h5>Processando compra de lote...</h5>
      ) : (
        <>
          <br />
          <br />
        </>
      )}
      <div className="divider" />
      <form onSubmit={handleSearchHarvest}>
        <div className="content">
          <h2>Mostrar informação de um lote</h2>

          <input
            placeholder="Digite o id do lote"
            value={harvestPositionSearch}
            onChange={(e) => setHarvestPositionSearch(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Buscar</button>
          {harvestInfo ? (
            <div>
              <p>
                <b>Tamanho do lote:</b> {harvestInfo.size} kg
              </p>
              <p>
                <b>Tamanho do preço:</b> {harvestInfo.size} wei
              </p>
              <p>
                <b>Data:</b> {converteHorario(parseInt(harvestInfo.timestamp))}
              </p>
              <p>
                <b>Proprietário:</b>{" "}
                {harvestInfo.owner ===
                "0x0000000000000000000000000000000000000000"
                  ? "Não alocado"
                  : harvestInfo.owner}{" "}
              </p>
            </div>
          ) : null}
        </div>
      </form>

      <br />
      <br />
    </div>
  );
}

export default Home;
