package com.babadonews.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.babadonews.model.Noticia;

public interface NoticiaRepository extends JpaRepository<Noticia, Long> {

}