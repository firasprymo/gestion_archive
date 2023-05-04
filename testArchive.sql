-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 04 mai 2023 à 19:36
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `testarchive`
--

-- --------------------------------------------------------

--
-- Structure de la table `agence`
--

CREATE TABLE `agence` (
  `id` bigint(20) NOT NULL,
  `creation_date` date NOT NULL,
  `last_modified_date` date DEFAULT NULL,
  `code_agence` varchar(255) DEFAULT NULL,
  `libelle_agence` varchar(255) DEFAULT NULL,
  `lieu_archive` varchar(255) DEFAULT NULL,
  `lieu_archive_sec_age` varchar(255) DEFAULT NULL,
  `structure_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `centre_archive`
--

CREATE TABLE `centre_archive` (
  `id` bigint(20) NOT NULL,
  `creation_date` date NOT NULL,
  `last_modified_date` date DEFAULT NULL,
  `code_centre_archive` varchar(255) DEFAULT NULL,
  `libelle_centre_archive` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `centre_archive`
--

INSERT INTO `centre_archive` (`id`, `creation_date`, `last_modified_date`, `code_centre_archive`, `libelle_centre_archive`) VALUES
(7, '2023-04-20', '2023-05-03', 'CA22', 'd22');

-- --------------------------------------------------------

--
-- Structure de la table `centre_pre_archive`
--

CREATE TABLE `centre_pre_archive` (
  `id` bigint(20) NOT NULL,
  `creation_date` date NOT NULL,
  `last_modified_date` date DEFAULT NULL,
  `code_centre_pre_archive` varchar(255) DEFAULT NULL,
  `libelle_centre_pre_archive` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `centre_pre_archive`
--

INSERT INTO `centre_pre_archive` (`id`, `creation_date`, `last_modified_date`, `code_centre_pre_archive`, `libelle_centre_pre_archive`) VALUES
(45, '2023-05-03', '2023-05-03', 'CP5', '500');

-- --------------------------------------------------------

--
-- Structure de la table `direction_regional`
--

CREATE TABLE `direction_regional` (
  `id` bigint(20) NOT NULL,
  `creation_date` date NOT NULL,
  `last_modified_date` date DEFAULT NULL,
  `code_direction` varchar(255) DEFAULT NULL,
  `libelle_direction` varchar(255) DEFAULT NULL,
  `lieu_archive` varchar(255) DEFAULT NULL,
  `lieu_archive_sec_age` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `direction_regional`
--

INSERT INTO `direction_regional` (`id`, `creation_date`, `last_modified_date`, `code_direction`, `libelle_direction`, `lieu_archive`, `lieu_archive_sec_age`) VALUES
(1, '2023-04-14', '2023-04-14', 'f', 'f', 'f', 'f');

-- --------------------------------------------------------

--
-- Structure de la table `document`
--

CREATE TABLE `document` (
  `id` bigint(20) NOT NULL,
  `creation_date` date NOT NULL,
  `last_modified_date` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `code_lieu_archive` varchar(255) DEFAULT NULL,
  `lieu_archive` varchar(255) DEFAULT NULL,
  `nomber_page` varchar(255) DEFAULT NULL,
  `nomenclature_id` bigint(20) DEFAULT NULL,
  `maturite_prem_age` datetime DEFAULT NULL,
  `maturite_sec_age` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `document`
--

INSERT INTO `document` (`id`, `creation_date`, `last_modified_date`, `status`, `code_lieu_archive`, `lieu_archive`, `nomber_page`, `nomenclature_id`, `maturite_prem_age`, `maturite_sec_age`) VALUES
(11, '2023-04-20', '2023-04-20', 'PENDING', 'ss', '333', '20', NULL, NULL, NULL),
(13, '2023-04-20', '2023-05-03', 'PRIME_AGE', 's', '5666', '2', NULL, NULL, NULL),
(15, '2023-04-20', '2023-04-20', 'PENDING', '4466', '44', '4466', NULL, NULL, NULL),
(29, '2023-05-01', '2023-05-01', 'PENDING', '65', 'AG5', '65', 20, NULL, NULL),
(31, '2023-05-01', '2023-05-01', 'PENDING', '78', 'AG5', '78', 21, NULL, NULL),
(46, '2023-05-03', '2023-05-03', NULL, '5', '5', '5', 21, NULL, NULL),
(47, '2023-05-03', '2023-05-03', 'PENDING', '5', '5', '5', 21, '2023-05-08 00:00:00', '2023-05-05 00:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `document_request`
--

CREATE TABLE `document_request` (
  `id` bigint(20) NOT NULL,
  `document_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `document_request`
--

INSERT INTO `document_request` (`id`, `document_id`, `user_id`) VALUES
(12, 11, 1),
(14, 13, 1),
(16, 15, 1),
(30, 29, 2),
(32, 31, 2),
(48, 47, 2);

-- --------------------------------------------------------

--
-- Structure de la table `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(49);

-- --------------------------------------------------------

--
-- Structure de la table `nomenclature`
--

CREATE TABLE `nomenclature` (
  `id` bigint(20) NOT NULL,
  `creation_date` date NOT NULL,
  `last_modified_date` date DEFAULT NULL,
  `designation_nomenclature` varchar(255) DEFAULT NULL,
  `duree_conservation_prem_age` varchar(255) DEFAULT NULL,
  `duree_conservation_sec_age` varchar(255) DEFAULT NULL,
  `valeur_historique_troi_age` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `nomenclature`
--

INSERT INTO `nomenclature` (`id`, `creation_date`, `last_modified_date`, `designation_nomenclature`, `duree_conservation_prem_age`, `duree_conservation_sec_age`, `valeur_historique_troi_age`) VALUES
(20, '2023-04-22', '2023-04-22', '5', '5', '2', b'0'),
(21, '2023-04-22', '2023-04-22', '55555', '5', '2', b'0'),
(22, '2023-04-22', '2023-05-03', '5555588', '55588', '27799', b'0');

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id` bigint(20) NOT NULL,
  `role_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `role_name`) VALUES
(1, 'ROLE_AGENT'),
(2, 'ROLE_ADMIN'),
(3, 'ROLE_RESPONSABLE'),
(4, 'ROLE_RESOPONSABLE_CENTRE_ARCHIVE'),
(5, 'ROLE_RESOPONSABLE_CENTRE_PRE_ARCHIVE'),
(6, 'ROLE_RESOPONSABLE');

-- --------------------------------------------------------

--
-- Structure de la table `structure_central`
--

CREATE TABLE `structure_central` (
  `id` bigint(20) NOT NULL,
  `creation_date` date NOT NULL,
  `last_modified_date` date DEFAULT NULL,
  `code_structure` varchar(255) DEFAULT NULL,
  `libelle_structure` varchar(255) DEFAULT NULL,
  `lieu_archive` varchar(255) DEFAULT NULL,
  `lieu_archive_sec_age` varchar(255) DEFAULT NULL,
  `directeur_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `structure_central`
--

INSERT INTO `structure_central` (`id`, `creation_date`, `last_modified_date`, `code_structure`, `libelle_structure`, `lieu_archive`, `lieu_archive_sec_age`, `directeur_id`) VALUES
(33, '2023-05-03', '2023-05-03', 'SCb', 'b', 'bv', 'b', 1);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `creation_date` date NOT NULL,
  `last_modified_date` date DEFAULT NULL,
  `lieu_affectation` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `agence_code` varchar(255) DEFAULT NULL,
  `direction_regional_code` varchar(255) DEFAULT NULL,
  `structure_central_code` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `creation_date`, `last_modified_date`, `lieu_affectation`, `password`, `username`, `agence_code`, `direction_regional_code`, `structure_central_code`, `email`) VALUES
(1, '2023-10-10', NULL, 'sddgdqsq', '$2a$10$lgYUCA2ZQn1/Qg1vlMtJX.rJGvNWcebGr.YNq9TtvArM7tAeIvdkC', 'admin', NULL, NULL, NULL, NULL),
(2, '2023-10-10', NULL, '1', '$2a$10$lgYUCA2ZQn1/Qg1vlMtJX.rJGvNWcebGr.YNq9TtvArM7tAeIvdkC', 'agent', 'AG5', NULL, NULL, NULL),
(24, '2023-04-26', '2023-04-26', 'admin', '$2a$10$HJC3sArulpfA8nFCFzaDEew0RwVrOlP0bX8N8wb6L0uuNu4pTLlH.', 'a', NULL, NULL, NULL, NULL),
(25, '2023-04-26', '2023-04-26', 'admin', '$2a$10$K4LZXggu2x1CdQWWYInkH.x1v8wvaGsrNZWGMmJkwkL9vZOrtjylK', 'addd', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `user_roles`
--

CREATE TABLE `user_roles` (
  `id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user_roles`
--

INSERT INTO `user_roles` (`id`, `role_id`) VALUES
(1, 2),
(2, 1),
(24, 5),
(25, 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `agence`
--
ALTER TABLE `agence`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_nd4la17fhwjaj488tah1rk998` (`code_agence`),
  ADD KEY `FKoxilbi863hrcs873pw3qcd2l6` (`structure_id`);

--
-- Index pour la table `centre_archive`
--
ALTER TABLE `centre_archive`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `centre_pre_archive`
--
ALTER TABLE `centre_pre_archive`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `direction_regional`
--
ALTER TABLE `direction_regional`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_nima2mw5wani0i3uo5tu348iy` (`code_direction`);

--
-- Index pour la table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKm9cdctep30n5odj1mhrxtu93j` (`nomenclature_id`);

--
-- Index pour la table `document_request`
--
ALTER TABLE `document_request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKfqcsrqiicschqtn8ccpxyyfft` (`document_id`),
  ADD KEY `FK8ks888at4xt842c83afyuj1qm` (`user_id`);

--
-- Index pour la table `nomenclature`
--
ALTER TABLE `nomenclature`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `structure_central`
--
ALTER TABLE `structure_central`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_i6ebhs6883ypvur7jl1hbjetf` (`code_structure`),
  ADD KEY `FKd5c59gngbuukb18c7chi930md` (`directeur_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK4w1uucvxbb5xquye1b1ndi515` (`agence_code`),
  ADD KEY `FKqlowdymtgmjq3qthchuybu674` (`direction_regional_code`),
  ADD KEY `FKrb8g5rwgc82nabvbwik3oqlh3` (`structure_central_code`);

--
-- Index pour la table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`,`role_id`),
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
  ADD CONSTRAINT `FKoxilbi863hrcs873pw3qcd2l6` FOREIGN KEY (`structure_id`) REFERENCES `structure_central` (`id`);

--
-- Contraintes pour la table `document`
--
ALTER TABLE `document`
  ADD CONSTRAINT `FKm9cdctep30n5odj1mhrxtu93j` FOREIGN KEY (`nomenclature_id`) REFERENCES `nomenclature` (`id`);

--
-- Contraintes pour la table `document_request`
--
ALTER TABLE `document_request`
  ADD CONSTRAINT `FK8ks888at4xt842c83afyuj1qm` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKfqcsrqiicschqtn8ccpxyyfft` FOREIGN KEY (`document_id`) REFERENCES `document` (`id`);

--
-- Contraintes pour la table `structure_central`
--
ALTER TABLE `structure_central`
  ADD CONSTRAINT `FKd5c59gngbuukb18c7chi930md` FOREIGN KEY (`directeur_id`) REFERENCES `direction_regional` (`id`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FKqlowdymtgmjq3qthchuybu674` FOREIGN KEY (`direction_regional_code`) REFERENCES `direction_regional` (`code_direction`),
  ADD CONSTRAINT `FKrb8g5rwgc82nabvbwik3oqlh3` FOREIGN KEY (`structure_central_code`) REFERENCES `structure_central` (`code_structure`);

--
-- Contraintes pour la table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `FKrhfovtciq1l558cw6udg0h0d3` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `FKsrdrenljg5rfi2ceuxfsx23oh` FOREIGN KEY (`id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
