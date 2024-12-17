CREATE DATABASE joyas;
\c joyas; --Aplica solamente si se utiliza el COMMAND

CREATE TABLE inventario (
    id          SERIAL PRIMARY KEY
    ,nombre     VARCHAR(50)
    ,categoria  VARCHAR(50)
    ,metal      VARCHAR(50)
    ,precio     INT
    ,stock      INT);

INSERT INTO inventario values
(DEFAULT, 'Collar Heart', 'collar', 'oro', 20000 , 2),
(DEFAULT, 'Collar History', 'collar', 'plata', 15000 , 5),
(DEFAULT, 'Aros Berry', 'aros', 'oro', 12000 , 10),
(DEFAULT, 'Aros Hook Blue', 'aros', 'oro', 25000 , 4),
(DEFAULT, 'Anillo Wish', 'aros', 'plata', 30000 , 4),
(DEFAULT, 'Anillo Cuarzo Greece', 'anillo', 'oro', 40000 , 2);

SELECT * FROM inventario;
--Si la tabla ya está creada, agregar la PRIMARY KEY
--al campo id utilizando ALTER TABLE:
-- ALTER TABLE inventario
-- ADD CONSTRAINT inventario_pkey PRIMARY KEY (id);