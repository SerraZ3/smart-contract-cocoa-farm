// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
pragma abicoder v2;

// Estrutura da colheita/safra
struct Harvest{
    // Valor em wei
    uint price;
    uint size;
    uint64 timestamp;
    address owner;
}

contract Farm{
    
    // Nome da fazenda
    string public name;
    
    // Colheitas/safras
    Harvest[] public harvests;

    // Dono contrato
    address public owner;
    
    // Cria a configuração inicial do sensor
    constructor(
        string memory _name
    ) {
        owner = msg.sender;
        name = _name;
    }
    // Cadastra as harvest
    function insertHarvest( 
        uint _price,
        uint _size,
        uint64 _timestamp
    ) public checkOwner {
        // Harvest memory aux = Harvest(_price, _size, _timestamp, address(0));
        // harvests.push(aux);
        harvests.push(Harvest(_price, _size, _timestamp, address(0)));
    }
    // Compra lote
    function buyHarvest(uint position) public payable {
        require(harvests[position].owner == address(0), "ops esse lote ja foi adquirido");
        require(msg.value == harvests[position].price, "Ops valor enviado diferente do lote");
        harvests[position].owner = msg.sender;
    }
     
    // Retorna array com lista dos lotes
    function listHarvest() public view returns(Harvest[] memory _harvests){
        return harvests;
    }
    modifier checkOwner(){
        require(msg.sender == owner);
        _;
    }
}
