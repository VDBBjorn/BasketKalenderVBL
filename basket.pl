use LWP::Simple qw(get);
use JSON        qw(from_json);
use DateTime 	qw();
use Data::Dumper;
use Net::Google::Calendar;


# my $username = "vandenbusschebjorn\@gmail.com";
# my $password = "asdsuszoadhnnfhp";

# my $cal = Net::Google::Calendar->new;
# $cal->login($username, $password);

my $url     = "http://vblcb.wisseq.eu/VBLCB_WebService/data/OrgDetailByGuid?issguid=BVBL1074";
my $decoded = from_json(get($url));

my $hash;

my $org = @$decoded[0];
my $teams = $org->{teams};
for $team (@$teams) {
	next unless $team->{guid} eq "BVBL1074HSE  1";
	# print $team->{"naam"}."\t(".$team->{"categorie"}.")\n";
	$hash->{$team->{"guid"}}->{"naam"} = $team->{"naam"};
	$hash->{$team->{"guid"}}->{"categorie"} = $team->{"categorie"};
	$url = "http://vblcb.wisseq.eu/VBLCB_WebService/data/TeamMatchesByGuid?teamguid=".$team->{"guid"};
	my $matches = from_json(get($url));
	for my $match (@$matches) {
		# printf("%s\t%s\t%40s\t-\t%-40s\t%s\n",
		# 	$match->{"datumString"},
		# 	$match->{"beginTijd"},
		# 	$match->{"tTNaam"},
		# 	$match->{"tUNaam"},
		# 	$match->{"accNaam"});
		$match->{"dateTime"} = convert_to_datetime($match->{"datumString"},$match->{"beginTijd"});
		push @{$hash->{$team->{"guid"}}->{"matches"}}, $match;
	}
}

# my $c;
#     for ($cal->get_calendars) {
#         print $_->title."\n";
#         print $_->id."\n\n";
#         $c = $_ if ($_->title eq 'My Non Default Calendar');
#     }

for my $guid (sort {$hash->{$a}->{"naam"} cmp $hash->{$b}->{"naam"}} keys %$hash) {
	print $hash->{$guid}->{"naam"}."\n";
	for my $match (sort {$a->{"dateTime"} <=> $b->{"dateTime"}} @{$hash->{$guid}->{"matches"}}) {
		next unless $match->{pouleGUID} eq "BVBL16179150WVHSE2A1";
		printf("%-10s\t%-8s\t",$match->{"dateTime"}->dmy(),$match->{"dateTime"}->time());
		printf("%-40s\t%-40s\t%-10s\t%-50s\t%-40s\n",$match->{"tTNaam"},$match->{"tUNaam"},$match->{"uitslag"},$match->{"accNaam"},$match->{"pouleNaam"});
	}
	print "\n";
}

sub convert_to_datetime {
	my ($date, $hour) = @_;
	my ($d,$m,$y) = $date 	=~ /^([0-9]{2})-([0-9]{2})-([0-9]{4})\z/ or die "date format failed";
	my ($h,$min) = $hour 	=~ /^([0-9]{2})\.([0-9]{2})\z/ or die "time format failed";
	my $dt = DateTime->new(
		year      => $y,
		month     => $m,
		day       => $d,
		hour       => $h,
		minute     => $min,
		time_zone => 'local',
	);
	return $dt;
}

