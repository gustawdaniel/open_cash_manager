use strict;
use warnings FATAL => 'all';
use Finance::QIF;
use JSON;

my $qif  = Finance::QIF->new( file => "backup.qif" );

# my $header = "";
# while ( my $record = $in->next() ) {
#     if ( $header ne $record->{header} ) {
#         $header = $record->{header};
#     }
#     print($record->{name},"\n");
# }

while ( my $record = $qif->next ) {
    print( "Header: ", $record->{header}, "\n" );
    foreach my $key ( keys %{$record} ) {
        # next
        #     if ( $key eq "header"
        #         || $key eq "splits"
        #         || $key eq "budget"
        #         || $key eq "prices" );
        print( "     ", $key, ": ", $record->{$key}, "\n" );
    }
    # if ( exists( $record->{splits} ) ) {
    #     foreach my $split ( @{ $record->{splits} } ) {
    #         foreach my $key ( keys %{$split} ) {
    #             print( "     Split: ", $key, ": ", $split->{$key}, "\n" );
    #         }
    #     }
    # }
    # if ( exists( $record->{budget} ) ) {
    #     print("     Budget: ");
    #     foreach my $amount ( @{ $record->{budget} } ) {
    #         print( " ", $amount );
    #     }
    #     print("\n");
    # }
    # if ( exists( $record->{prices} ) ) {
    #     print("     Date     Close   Max     Min     Volume\n");
    #     my $format = "     %8s %7.2f %7.2f %7.2f %-8d\n";
    #     foreach my $price ( @{ $record->{prices} } ) {
    #         printf( $format,
    #             $price->{"date"}, $price->{"close"}, $price->{"max"},
    #             $price->{"min"},  $price->{"volume"} );
    #     }
    # }
}

$qif->close();
