package com.pfe.najd.repository;

import com.pfe.najd.entities.DirectionRegional;
import com.pfe.najd.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface DirectionRegionalRepository extends JpaRepository<DirectionRegional, Long>,
        JpaSpecificationExecutor<DirectionRegional> {
}
