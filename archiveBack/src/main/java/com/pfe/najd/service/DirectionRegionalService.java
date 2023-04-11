package com.pfe.najd.service;

import com.pfe.najd.entities.DirectionRegional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface DirectionRegionalService {
    Page<DirectionRegional> pageDirectionRegionals(Pageable pageable);
}
