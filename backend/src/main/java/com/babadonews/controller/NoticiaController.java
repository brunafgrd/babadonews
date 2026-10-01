package com.babadonews.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.babadonews.model.Noticia;
import com.babadonews.service.NoticiaService;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/noticias")
public class NoticiaController {

    private final NoticiaService service;

    public NoticiaController(NoticiaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Noticia> listarTodas() {
        return service.listarTodas();
    }

    @PostMapping
    public Noticia cadastrar(@RequestBody Noticia noticia) {
        return service.cadastrar(noticia);
    }

    @GetMapping("/{id}")
    public Noticia buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public Noticia atualizar(@PathVariable Long id, @RequestBody Noticia noticia) {
        return service.atualizar(id, noticia);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }
}