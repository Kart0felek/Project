-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Cze 02, 2025 at 08:43 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sklep`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `asortyment`
--

CREATE TABLE `asortyment` (
  `ID_Prod` int(11) NOT NULL,
  `Nazwa` varchar(50) NOT NULL,
  `Typ` varchar(25) NOT NULL,
  `Ilosc` int(11) NOT NULL,
  `Cena` int(11) NOT NULL,
  `Opis` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `asortyment`
--

INSERT INTO `asortyment` (`ID_Prod`, `Nazwa`, `Typ`, `Ilosc`, `Cena`, `Opis`) VALUES
(1, 'Wędka spinningowa Predator', 'Wędka', 5, 199, 'Lekka i wytrzymała wędka spinningowa idealna do połowu okoni, szczupaków i sandaczy.'),
(2, 'Wędka feeder Crap Hunter', 'Wędka', 8, 149, 'Wędka feederowa o dużej wytrzymałości, idealna do połowu karpi i innych dużych ryb.'),
(3, 'Wędka muchowa Fly Master', 'Wędka', 6, 249, 'Lekka i precyzyjna wędka muchowa, idealna do połowu troci i łososi.'),
(4, 'Kołowrotek Carp Master', 'Kołowrotek', 5, 179, 'Kołowrotek o dużej pojemności szpuli.'),
(5, 'Kołowrotek Spinning Pro', 'Kołowrotek', 8, 199, 'Kompaktowy i lekki kołowrotek spinningowy.'),
(6, 'Kołowrotek Fly Reel', 'Kołowrotek', 4, 159, 'Kołowrotek muchowy o płynnym działaniu.'),
(7, 'Żyłka wędkarska StrongLine', 'Żyłka', 50, 15, 'Wytrzymała żyłka wędkarska o średnicy 0,25 mm, idealna do połowu w rzekach i jeziorach.'),
(8, 'Żyłka wędkarska SuperLine', 'Żyłka', 30, 10, 'Żyłka wędkarska o średnicy 0,20 mm, idealna do połowu drobnych ryb.'),
(9, 'Żyłka wędkarska UltraLine', 'Żyłka', 20, 20, 'Żyłka wędkarska o średnicy 0,30 mm, idealna do połowu dużych ryb.'),
(10, 'Plecionka wędkarska Power Braid', 'Plecionka', 20, 35, 'Plecionka wędkarska o dużej wytrzymałości i odporności na ścieranie.'),
(11, 'Plecionka wędkarska Super Braid', 'Plecionka', 15, 25, 'Plecionka wędkarska o średnicy 0,15 mm, idealna do połowu drobnych ryb.'),
(12, 'Plecionka wędkarska Ultra Braid', 'Plecionka', 10, 45, 'Plecionka wędkarska o średnicy 0,20 mm, idealna do połowu dużych ryb.'),
(13, 'Hak wędkarski Sharp Hook', 'Hak', 100, 5, 'Ostre i wytrzymałe haki wędkarskie, idealne do połowu różnych gatunków ryb.'),
(14, 'Hak wędkarski Mikro Hook', 'Hak', 50, 4, 'Małe i ostre haki wędkarskie, idealne do połowu drobnych ryb.'),
(15, 'Hak wędkarski Heavy Hook', 'Hak', 30, 6, 'Duże i wytrzymałe haki wędkarskie, idealne do połowu dużych ryb.'),
(16, 'Przynęta Jerkbait', 'Przynęta', 20, 12, 'Sztuczna przynęta imitująca rybę.'),
(17, 'Przynęta Worm', 'Przynęta', 30, 8, 'Sztuczna przynęta w kształcie robaka.'),
(18, 'Kurtka wędkarska', 'Odzież', 10, 149, 'Wodoodporna i wiatroszczelna kurtka wędkarska z wieloma kieszeniami.'),
(19, 'Spodnie wędkarskie', 'Odzież', 10, 99, 'Wygodne i wytrzymałe spodnie wędkarskie z wzmocnionymi kolanami.');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `opinie`
--

CREATE TABLE `opinie` (
  `ID_Opinii` int(11) NOT NULL,
  `Opinia` text NOT NULL,
  `Autor` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `opinie`
--

INSERT INTO `opinie` (`ID_Opinii`, `Opinia`, `Autor`) VALUES
(1, 'Najlepszy sklep wędkarski! Super jakość produktów.', 'Adam K.'),
(2, 'Dostawa na czas, sprzęt zgodny z opisem. Polecam!', 'Marta P.');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zamowienia`
--

CREATE TABLE `zamowienia` (
  `ID_Zamowienia` int(11) NOT NULL,
  `Uzytkownik` varchar(50) NOT NULL,
  `Kraj` varchar(50) NOT NULL,
  `Kod_pocztowy` int(11) NOT NULL,
  `Adres` varchar(50) NOT NULL,
  `Telefon` int(11) NOT NULL,
  `Zamowienie` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `asortyment`
--
ALTER TABLE `asortyment`
  ADD PRIMARY KEY (`ID_Prod`);

--
-- Indeksy dla tabeli `opinie`
--
ALTER TABLE `opinie`
  ADD PRIMARY KEY (`ID_Opinii`);

--
-- Indeksy dla tabeli `zamowienia`
--
ALTER TABLE `zamowienia`
  ADD PRIMARY KEY (`ID_Zamowienia`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `asortyment`
--
ALTER TABLE `asortyment`
  MODIFY `ID_Prod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `opinie`
--
ALTER TABLE `opinie`
  MODIFY `ID_Opinii` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `zamowienia`
--
ALTER TABLE `zamowienia`
  MODIFY `ID_Zamowienia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
