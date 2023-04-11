-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 07 avr. 2023 à 19:09
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `test`
--

-- --------------------------------------------------------

--
-- Structure de la table `agence`
--

CREATE TABLE `agence` (
  `code_agence` varchar(255) NOT NULL,
  `libelle_agence` varchar(255) DEFAULT NULL,
  `lieu_archive` varchar(255) DEFAULT NULL,
  `structure_central_code` varchar(255) DEFAULT NULL,
  `lieu_archive_sec_agece` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `centre_archive`
--

CREATE TABLE `centre_archive` (
  `code_centre_archive` varchar(255) NOT NULL,
  `libelle_centre_archive` varchar(255) DEFAULT NULL,
  `lieu_archive_sec_age` varchar(255) DEFAULT NULL,
  `lieu_archive_trem_age` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `centre_archive`
--

INSERT INTO `centre_archive` (`code_centre_archive`, `libelle_centre_archive`, `lieu_archive_sec_age`, `lieu_archive_trem_age`) VALUES
('CA005', 'centre Archive Example', 'Example Location', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `centre_pre_archive`
--

CREATE TABLE `centre_pre_archive` (
  `code_centre_pre_archive` varchar(255) NOT NULL,
  `libelle_centre_pre_archive` varchar(255) DEFAULT NULL,
  `lieu_archive_sec_age` varchar(255) DEFAULT NULL,
  `lieu_archive_trem_age` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `direction_regional`
--

CREATE TABLE `direction_regional` (
  `code_direction` varchar(255) NOT NULL,
  `libelle_direction` varchar(255) DEFAULT NULL,
  `lieu_archive` varchar(255) DEFAULT NULL,
  `lieu_archive_sec_age` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `direction_regional`
--

INSERT INTO `direction_regional` (`code_direction`, `libelle_direction`, `lieu_archive`, `lieu_archive_sec_age`) VALUES
('DR002', 'testupdate', 'testtest24', ''),
('DR003', 'Agence Example', 'Agence Location', 'thes2');

-- --------------------------------------------------------

--
-- Structure de la table `document`
--

CREATE TABLE `document` (
  `num_document` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `nomenclature`
--

CREATE TABLE `nomenclature` (
  `code_nomenclature` int(11) NOT NULL,
  `designation_nomenclature` varchar(255) DEFAULT NULL,
  `duree_conservation_prem_age` varchar(255) DEFAULT NULL,
  `duree_conservation_sec_age` varchar(255) DEFAULT NULL,
  `valeur_historique_troi_age` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id` bigint(20) NOT NULL,
  `role_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `role_name`) VALUES
(1, 'ROLE_USER'),
(2, 'ROLE_ADMIN'),
(3, 'ROLE_AGENT'),
(4, 'ROLE_RESOPONSABLE'),
(5, 'ROLE_RESOPONSABLE_CENTRE_ARCHIVE'),
(6, 'ROLE_RESOPONSABLE_CENTRE_PRE_ARCHIVE');

-- --------------------------------------------------------

--
-- Structure de la table `structure_central`
--

CREATE TABLE `structure_central` (
  `code_structure` varchar(255) NOT NULL,
  `libelle_structure` varchar(255) DEFAULT NULL,
  `lieu_archive` varchar(255) DEFAULT NULL,
  `direction_regional_code` varchar(255) DEFAULT NULL,
  `lieu_archive_sec_age` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `username` varchar(255) NOT NULL,
  `lieu_affectation` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `agence_code` varchar(255) DEFAULT NULL,
  `direction_regional_code` varchar(255) DEFAULT NULL,
  `structure_central_code` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`username`, `lieu_affectation`, `password`, `agence_code`, `direction_regional_code`, `structure_central_code`) VALUES
('najd', 'sddgdqsq', '$2a$10$lgYUCA2ZQn1/Qg1vlMtJX.rJGvNWcebGr.YNq9TtvArM7tAeIvdkC', NULL, NULL, NULL),
('najd1', '1', '$2a$10$h6n1Ly2KhiJ4NR9LKRa50.qLwH5F39YssNz6PRK5gwqMtgS8vSGLS', NULL, NULL, NULL),
('najd2', 'Test Location', '$2a$10$.VwWRjTNaIpwHfUM3bMo2uLdNu7kVzw4ioD/lKvgacar1qYCFWgP2', NULL, NULL, NULL),
('najd3', 'Test Location', '$2a$10$T3s9D7zTd5BXWu12/FAtIuwO6GlJepc8Xz96oDMAS0yUaUzXcximm', NULL, NULL, NULL),
('souhaila', 'Test Location', '$2a$10$36YTl3DqTWucJDLbnmFPZu1FvHINeT/RXY2kWaHCbBX4MHkC4Xo0q', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `user_roles`
--

CREATE TABLE `user_roles` (
  `username` varchar(255) NOT NULL,
  `role_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `user_roles`
--

INSERT INTO `user_roles` (`username`, `role_id`) VALUES
('najd', 2),
('najd1', 1),
('najd2', 1),
('najd3', 1),
('souhaila', 1),
('souhaila', 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `agence`
--
ALTER TABLE `agence`
  ADD PRIMARY KEY (`code_agence`),
  ADD KEY `FKkwgqxlukmxut1etkofpgkonhe` (`structure_central_code`);

--
-- Index pour la table `centre_archive`
--
ALTER TABLE `centre_archive`
  ADD PRIMARY KEY (`code_centre_archive`);

--
-- Index pour la table `centre_pre_archive`
--
ALTER TABLE `centre_pre_archive`
  ADD PRIMARY KEY (`code_centre_pre_archive`);

--
-- Index pour la table `direction_regional`
--
ALTER TABLE `direction_regional`
  ADD PRIMARY KEY (`code_direction`);

--
-- Index pour la table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`num_document`);

--
-- Index pour la table `nomenclature`
--
ALTER TABLE `nomenclature`
  ADD PRIMARY KEY (`code_nomenclature`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `structure_central`
--
ALTER TABLE `structure_central`
  ADD PRIMARY KEY (`code_structure`),
  ADD KEY `FKolojrf2symmrgxsix4mm05cij` (`direction_regional_code`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`username`),
  ADD KEY `FK4w1uucvxbb5xquye1b1ndi515` (`agence_code`),
  ADD KEY `FKqlowdymtgmjq3qthchuybu674` (`direction_regional_code`),
  ADD KEY `FKrb8g5rwgc82nabvbwik3oqlh3` (`structure_central_code`);

--
-- Index pour la table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`username`,`role_id`),
  ADD KEY `FKrhfovtciq1l558cw6udg0h0d3` (`role_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `agence`
--
ALTER TABLE `agence`
  ADD CONSTRAINT `FKkwgqxlukmxut1etkofpgkonhe` FOREIGN KEY (`structure_central_code`) REFERENCES `structure_central` (`code_structure`);

--
-- Contraintes pour la table `structure_central`
--
ALTER TABLE `structure_central`
  ADD CONSTRAINT `FKolojrf2symmrgxsix4mm05cij` FOREIGN KEY (`direction_regional_code`) REFERENCES `direction_regional` (`code_direction`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK4w1uucvxbb5xquye1b1ndi515` FOREIGN KEY (`agence_code`) REFERENCES `agence` (`code_agence`),
  ADD CONSTRAINT `FKqlowdymtgmjq3qthchuybu674` FOREIGN KEY (`direction_regional_code`) REFERENCES `direction_regional` (`code_direction`),
  ADD CONSTRAINT `FKrb8g5rwgc82nabvbwik3oqlh3` FOREIGN KEY (`structure_central_code`) REFERENCES `structure_central` (`code_structure`);

--
-- Contraintes pour la table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `FKo2j0svxgcf9yhw4j1iboj61yq` FOREIGN KEY (`username`) REFERENCES `user` (`username`),
  ADD CONSTRAINT `FKrhfovtciq1l558cw6udg0h0d3` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
