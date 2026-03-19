# Puppet manifest for ObservaScore server configuration
# Author: Harshitt Singhrowa | Reg: 23FE10CSE00838
# Course: CSE3253 DevOps [PE6]

class observascore {

  # Ensure Node.js is installed
  package { 'nodejs':
    ensure => '18.x',
  }

  # Ensure npm is installed
  package { 'npm':
    ensure => present,
    require => Package['nodejs'],
  }

  # Ensure Docker is installed
  package { 'docker-ce':
    ensure => present,
  }

  # Ensure Docker service is running
  service { 'docker':
    ensure => running,
    enable => true,
    require => Package['docker-ce'],
  }

  # Create app directory
  file { '/opt/observascore':
    ensure  => directory,
    owner   => 'ubuntu',
    group   => 'ubuntu',
    mode    => '0755',
  }

  # Deploy environment config
  file { '/opt/observascore/.env':
    ensure  => file,
    owner   => 'ubuntu',
    group   => 'ubuntu',
    mode    => '0600',
    content => template('observascore/env.erb'),
    require => File['/opt/observascore'],
  }

  # Ensure MongoDB service is running (if not containerized)
  service { 'mongod':
    ensure => running,
    enable => true,
  }

  # Open firewall ports
  firewall { '100 allow observascore frontend':
    dport  => 3000,
    proto  => tcp,
    action => accept,
  }

  firewall { '101 allow observascore backend':
    dport  => 5000,
    proto  => tcp,
    action => accept,
  }

  firewall { '102 allow nagios monitoring':
    dport  => 8081,
    proto  => tcp,
    action => accept,
  }
}

include observascore
