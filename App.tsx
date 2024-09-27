import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Pastikan sudah di-install dan di-import

export default function LocationProfile() {
  const coffeeRecommendations = [
    'Cappuccino',
    'Macchiato',
    'Milk',
    'Coffee',
  ];

  const products = [
    { id: 1, name: 'Red Velvet', price: 'Rp. 35.000', image: 'https://cdn.idntimes.com/content-images/community/2022/11/fromandroid-5c5c2e0743a17da042fc78a2705ca7bd.jpg', rating: 4.9, description: 'Minuman lembut dan lezat yang mirip dengan kue' },
    { id: 2, name: 'Green Tea', price: 'Rp.25.000', image: 'https://halosehat.com/wp-content/uploads/2020/09/Manfaat-Minum-Green-Tea-Latte.jpg', rating: 4.7, description: 'Minuman teh hijau dengan rasa yang segar' },
    { id: 3, name: 'Mochachino', price: 'Rp. 27.000', image: 'https://culinaryginger.com/wp-content/uploads/Cafe-Mochachino-Recipe-9.jpg', rating: 4.8, description: 'Campuran kopi dan cokelat yang nikmat' },
    { id: 4, name: 'Mango Milk', price: 'Rp. 30.000', image: 'https://tse2.mm.bing.net/th?id=OIP.GGvnCLU8c8xJOpZywhZrFgHaJQ&pid=Api&P=0&h=220', rating: 4.6, description: 'Minuman mangga segar dicampur dengan susu' },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecommendations = coffeeRecommendations.filter(coffee =>
    coffee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
  };

  // Fungsi renderStars dengan tipe parameter yang jelas
  // const renderStars = (rating: number) => {
  //   const stars = [];
  //   for (let i = 1; i <= 5; i++) {
  //     stars.push(
  //       <Icon
  //         key={i}
  //         name={i <= rating ? 'star' : 'star-o'}
  //         size={16}
  //         color="#FFD700"
  //         style={{ marginHorizontal: 1 }}
  //       />
  //     );
  //   }
  //   return stars;
  // };

  return (
    <View style={styles.container}>
      {/* Header dengan gambar profil dan lokasi */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>Location</Text>
          <Text style={styles.subLocationText}>Sukabumi, Indonesia</Text>
        </View>
        <Image
          source={require('./gambar/aku2.jpeg')} // Ganti dengan URL gambar profil Anda
          style={styles.profileImage}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Drink"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>

      {/* Gambar Bawah dengan promo*/}
      <View style={styles.bottomImageContainer}>
        <Image
          source={require('./gambar/minuman.jpeg')} // Ensure this path is correct
          style={styles.bottomImage}
        />
        {/* Promo Text */}
        <View style={styles.promoTextContainer}>
          <Text style={styles.promoTitle}>Promo</Text>
          <Text style={styles.promoSubtitle}>Buy one get</Text>
          <Text style={styles.promoSubtitle}>one FREE</Text>
        </View>
      </View>

      {/* Horizontal ScrollView untuk rekomendasi kopi */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.recommendationsContainer}
      >
        {filteredRecommendations.map((coffee, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.recommendationItem, hoveredIndex === index && styles.hovered]}
            onPressIn={() => setHoveredIndex(index)} 
            onPressOut={() => setHoveredIndex(null)}
            onPress={() => console.log(`You selected ${coffee}`)}
          >
            <Text style={styles.recommendationText}>{coffee}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Scrollable Container untuk Product Cards */}
      <ScrollView style={styles.cardsScrollView}>
        <View style={styles.cardsContainer}>
          {products.map((product) => (
            <View key={product.id} style={styles.verticalCard}>
              <View style={styles.imageContainer}>
                <Text style={styles.ratingText}>★ {product.rating}</Text>
                {/* Gambar Produk */}
                <Image source={{ uri: product.image }} style={styles.verticalCardImage} />
                
            
              </View>
              <View style={styles.cardDetails}>
                <Text style={styles.verticalCardTitle}>{product.name}</Text>
                
                {/* Deskripsi Produk */}
                <Text style={styles.descriptionText}>{product.description}</Text>

                <View style={styles.priceButtonContainer}>
                  <Text style={styles.verticalCardPrice}>{product.price}</Text>
                  <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  locationContainer: {
    flex: 1,
    marginRight: 10,
    marginBottom: 5,
  },
  locationText: {
    fontSize: 12,
    color: '#B7B7B7',
  },
  subLocationText: {
    fontSize: 16,
    color: '#DDDDDD',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'grey',
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchBar: {
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    fontSize: 14,
    color: '#000',
  },
  bottomImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  bottomImage: {
    width: '100%',
    height: 140,
    borderRadius: 16,
  },
  promoTextContainer: {
    position: 'absolute',
    top: 10,
    left: '10%',
    padding: 10,
  },
  promoTitle: {
    backgroundColor: '#ED5151',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5,
    alignSelf: 'flex-start',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  promoSubtitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: -2,
  },
  recommendationsContainer: {
    paddingVertical: 5,
    paddingLeft: 20,
    marginBottom: 20,
  },
  recommendationItem: {
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recommendationText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  hovered: {
    backgroundColor: '#A0522D',
  },
  cardsScrollView: {
    marginVertical: 15,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  verticalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  verticalCardImage: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 14,
    color: '#Ffd700',
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  cardDetails: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 100, //beda
  },
  verticalCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  descriptionText: {
    fontSize: 12,
    color: '#666',
    marginVertical: 5,
  },
  priceButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verticalCardPrice: {
    fontSize: 14,
    color: '#A0522D',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#A0522D',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
  },
});
