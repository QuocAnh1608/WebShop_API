package com.poly.service;

import java.util.List;

import com.poly.entity.Authority;

public interface AuthorityService {

	List<Authority> findAll();

	List<Authority> findAuthoritiesOfAdministrators();

	Authority create(Authority auth);

	void delete(Integer id);

}
