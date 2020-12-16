<?php

	class Veiculos {
		var $id ;
		var $tipo ;
		var $placa ;
		var $entrada ;
		var $saida ;
		var $valor ;
		var $data_veiculos ;
		var $valortotal ;
		
		function getId (){
			return $this->id ;
		}
		function setId ($id ){
			$this->id  = $id ;
		}

		function getTipo (){
			return $this->tipo ;
		}
		function setTipo ($tipo ){
			$this->tipo  = $tipo ;
		}

		function getPlaca (){
			return $this->placa ;
		}
		function setPlaca ($placa ){
			$this->placa  = $placa ;
		}

		function getEntrada (){
			return $this->entrada ;
		}
		function setEntrada ($entrada ){
			$this->entrada  = $entrada ;
		}

		function getSaida (){
			return $this->saida ;
		}
		function setSaida ($saida ){
			$this->saida  = $saida ;
		}

		function getValor (){
			return $this->valor ;
		}
		function setValor ($valor ){
			$this->valor  = $valor ;
		}

		function getData_veiculos (){
			return $this->data_veiculos ;
		}

		function setData_veiculos ($data_veiculos ){
			$this->data_veiculos  = $data_veiculos ;
		}

		function getValortotal (){
			return $this->valortotal ;
		}

		function setValortotal ($valortotal ){
			$this->valortotal  = $valortotal ;
		}

	}

	class VeiculosDAO {
		function create($veiculos) {
			$result = array();
		
			try {
			
				$query = "INSERT INTO veiculos VALUES (default, '".$veiculos->getTipo()."','".$veiculos->getPlaca()."','".$veiculos->getEntrada()."','".$veiculos->getSaida()."','".$veiculos->getValor()."', '".$veiculos->getData_veiculos()."')";

				$con = new Connection();

				if(Connection::getInstance()->exec($query) >= 1){
					$result["id"] = Connection::getInstance()->lastInsertId();
					$result["tipo"] = $veiculos->getTipo();
					$result["placa"] = $veiculos->getPlaca();
					$result["entrada"] = $veiculos->getEntrada();
					$result["saida"] = $veiculos->getSaida();
					$result["valor"] = $veiculos->getValor();
					$result["data_veiculos"] = $veiculos->getData_veiculos();
				} else{
					$result["erro"] = "Add não realizado com sucesso!!!";
				}

				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}

			return $result;
		}

		function readView() {
			$result = array();
			
			try {
				$query = "SELECT * FROM VW_PROPIETARIO";
				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);
				while($row = $resultSet->fetchObject()){
					$veiculo = new Veiculos();
					$veiculo->setId($row->id);
					$veiculo->setTipo($row->tipo);
					$veiculo->setPlaca($row->placa);
					$veiculo->setEntrada($row->entrada);
					$veiculo->setSaida($row->saida);
					$veiculo->setValortotal($row->valortotal);
					$result[] = $veiculo;
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}

			return $result;
		}

		function readAll() {
			$result = array();

			try {
				$query = "SELECT * FROM veiculos";
				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);
				while($row = $resultSet->fetchObject()){
					$veiculo = new Veiculos();
					$veiculo->setId($row->id);
					$veiculo->setTipo($row->tipo);
					$veiculo->setPlaca($row->placa);
					$veiculo->setEntrada($row->entrada);
					$veiculo->setSaida($row->saida);
					$veiculo->setValor($row->valor);
					$veiculo->setData_veiculos($row->data_veiculos);
					$result[] = $veiculo;
				}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}

			return $result;
		}

		function read($id) {
			$result = array();
			$query = "SELECT * FROM veiculos where id=$id";
			try {
				
				$con = new Connection();
				$resultSet = Connection::getInstance()->query($query);
				if($resultSet){
				while($row = $resultSet->fetchObject()){
				$veiculo = new Veiculos();
				$veiculo->setId($row->id);
				$veiculo->setTipo($row->tipo);
				$veiculo->setPlaca($row->placa);
				$veiculo->setEntrada($row->entrada);
				$veiculo->setSaida($row->saida);
				$veiculo->setValor($row->valor);
				$veiculo->setData_veiculos($row->data_veiculos);
				$result[] = $veiculo;
				}
			}
				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}

			return $result;
		}

		function update($veiculo) {
			$result = array();
			$id = $veiculo->getId();
			$tipo = $veiculo->getTipo();
			$placa = $veiculo->getPlaca();
			$entrada = $veiculo->getEntrada();
			$saida = $veiculo->getSaida();
			$valor = $veiculo->getValor();

			try {
				$query = "UPDATE veiculos SET tipo = '$tipo', placa = '$placa', entrada = '$entrada', saida = '$saida', valor = '$valor' WHERE id = $id";

				$con = new Connection();

				$status = Connection::getInstance()->prepare($query);

				if($status->execute()){
					$result = $veiculo;
				} else {
					$result["erro"] = "Atualização de dados não realizada com sucesso!!!";
				}

				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}

			return $result;
		}

		function delete($id) {
			$result = array();

			try {
				$query = "DELETE FROM veiculos WHERE id = $id";

				$con = new Connection();

				if(Connection::getInstance()->exec($query) >= 1){
					$result["msg"] = "Veículo excluído!!!";
				}else{
					$result["error"] = "Veículo não excluído!!!";
				}

				$con = null;
			}catch(PDOException $e) {
				$result["err"] = $e->getMessage();
			}

			return $result;
		}

	}
