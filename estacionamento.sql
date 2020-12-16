drop database if exists estacionamentos;
create database estacionamentos;
use estacionamentos;

create table veiculos(
	id integer not null auto_increment, 
	tipo varchar(10) not null,
    placa varchar(8) not null,
    entrada TIME not null,
	saida TIME,
	valor decimal(8, 2),
	data_veiculos date,
	primary key (id)
);

select * from veiculos;show tables;

CREATE VIEW VW_PROPIETARIO AS
SELECT v.id, v.tipo, v.placa, v.entrada, v.saida, round(TIME_TO_SEC(TIMEDIFF(saida, entrada))/3600.0 ,2) AS dif_fra_seg,
						  						  round((TIME_TO_SEC(TIMEDIFF(saida, entrada))/3600.0 * valor ),2) AS valortotal FROM veiculos v;



