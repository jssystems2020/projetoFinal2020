<?php

	require("../../domain/connection.php");
	require("../../domain/Veiculos.php");

	class VeiculosProcess {
		var $vd;

		function doGet($arr){
			$vd = new VeiculosDAO();
			if($arr["id"]=="0"){
			//	$sucess = $vd->readAll();
				$sucess = $vd->readView();	
			}else{
				
				$sucess = $vd->read($arr["id"]);
			}
			
			http_response_code(200);
			echo json_encode($sucess);
		}


		function doPost($arr){
			$vd = new VeiculosDAO();
			$veiculos = new Veiculos();
			$veiculos->setTipo($arr["tipo"]);
			$veiculos->setPlaca($arr["placa"]);
			$veiculos->setEntrada($arr["entrada"]);
			$veiculos->setSaida($arr["saida"]);
			$veiculos->setValor($arr["valor"]);
			$veiculos->setData_veiculos($arr["data_veiculos"]);
			$sucess = $vd->create($veiculos);
			http_response_code(200);
			echo json_encode($sucess);
		}


		function doPut($arr){
			$vd = new VeiculosDAO();
			$veiculos = new Veiculos();
			$veiculos->setId($arr["id"]);
			$veiculos->setTipo($arr["tipo"]);
			$veiculos->setPlaca($arr["placa"]);
			$veiculos->setEntrada($arr["entrada"]);
			$veiculos->setSaida($arr["saida"]);
			$veiculos->setValor($arr["valor"]);
			$sucess = $vd->update($veiculos);
			http_response_code(200);
			echo json_encode($sucess);
		}


		function doDelete($arr){
			$vd = new VeiculosDAO();
			$sucess = $vd->delete($arr["id"]);
			http_response_code(200);
			echo json_encode($sucess);
		}
	}