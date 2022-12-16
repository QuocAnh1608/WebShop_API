package com.poly.servide.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.dao.AccountDAO;
import com.poly.entity.Account;
import com.poly.service.AccountService;

@Service
public class AccountServiceIpml implements AccountService{
	@Autowired
	AccountDAO adao;

	@Override
	public Account findById(String username) {
		// TODO Auto-generated method stub
		return adao.findById(username).get();
	}

	@Override
	public List<Account> getAdministrators() {
		// TODO Auto-generated method stub
		return adao.getAdministrators();
	}

	@Override
	public List<Account> findAll() {
		// TODO Auto-generated method stub
		return adao.findAll();
	}

	@Override
	public Account create(Account acc) {
		// TODO Auto-generated method stub
		return adao.save(acc);
	}

	@Override
	public void delete(String id) {
		// TODO Auto-generated method stub
		adao.deleteById(id);
	}

	@Override
	public Account update(Account id) {
		// TODO Auto-generated method stub
		return adao.save(id);
	}

}
