package com.babadonews.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.babadonews.model.Noticia;
import com.babadonews.repository.NoticiaRepository;

@Service
public class NoticiaService {

    private final NoticiaRepository repository;

    public NoticiaService(NoticiaRepository repository) {
        this.repository = repository;
    }

    public List<Noticia> listarTodas() {
        return repository.findAll();
    }

    public Noticia cadastrar(Noticia noticia) {
        return repository.save(noticia);
    }

    public Noticia buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Noticia atualizar(Long id, Noticia dados) {
        Noticia noticia = repository.findById(id).orElse(null);

        if (noticia == null) {
            return null;
        }

        noticia.setTitulo(dados.getTitulo());
        noticia.setConteudo(dados.getConteudo());
        noticia.setImagem(dados.getImagem());
        noticia.setCategoria(dados.getCategoria());

        return repository.save(noticia);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}